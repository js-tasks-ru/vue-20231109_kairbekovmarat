<template>
  <div class="toasts">
    <TheToast v-for="(toast, index) in toasts"
      :message="toast.message"
      :type="toast.type"
      :key="toast.id"
      @remove="removeToast(index)" />
  </div>
</template>

<script>
import TheToast from './TheToast.vue';

export default {
  name: 'TheToaster',

  data() {
    return {
      toasts: [],
    }
  },

  methods: {
    success(text) {
      this.toasts.push({
        id: Math.random().toString(36),
        message: text,
        type: 'success',
      });
    },

    error(text) {
      this.toasts.push({
        id: Math.random().toString(36),
        message: text,
        type: 'error',
      });
    },

    removeToast(index) {
      this.toasts.splice(index, 1);
    }
  },

  components: { TheToast }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
