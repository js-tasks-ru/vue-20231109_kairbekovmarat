<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="{ '--bg-url': hasPreview ? `url('${inputPreview}')` : '' }"
      @click="labelClick">

      <span class="image-uploader__text">
        {{ uploaderText }}
      </span>
      <input ref="uploader-input" v-bind="$attrs" type="file" accept="image/*" class="image-uploader__input" @change="fileUpload" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  data() {
    return {
      loading: false,
      inputPreview: null,
    };
  },

  emits: ['select', 'upload', 'error', 'remove'],
  props: {
    preview: String,
    uploader: Function,
  },

  watch: {
    preview: {
      handler(value) {
        this.inputPreview = value;
      },

      immediate: true,
    }
  },

  computed: {
    hasPreview() {
      return !!this.inputPreview;
    },

    uploaderText() {
      if(this.loading) {
        return 'Загрузка...';
      } else if(this.hasPreview) {
        return 'Удалить изображение';
      }

      return 'Загрузить изображение';
    }
  },

  methods: {
    labelClick(event) {
      if(this.hasPreview) {
        event.preventDefault();
        this.inputPreview = null;
        this.$refs['uploader-input'].value = '';
        this.$emit('remove');
      }
    },

    async fileUpload(event) {
      const file = event.target.files[0];
      this.$emit('select', file);

      if(typeof this.uploader != 'function') { // Проверяем, передали ли загрузчик
        return;
      }

      this.loading = true;

      try {
        await this.uploader(file)
          .then(response => {
            this.inputPreview = URL.createObjectURL(file);
            this.$emit('upload', response);
          });
      } catch(error) {
        this.$emit('error', error);
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
