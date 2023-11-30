<template>
  <div class="toasts">
    <Toast v-for="toast in toasts"
      :message="toast.message"
      :type="toast.type" />
  </div>
</template>

<script>
import Toast from './Toast.vue';

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
        message: text,
        type: 'success',
      });
    },

    error(text) {
      this.toasts.push({
        message: text,
        type: 'error',
      });
    }
  },

  components: { Toast }
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
