<template>
  <div class="toast" :class="className">
    <!-- <span class="toast__close" v-if="manualClose">&times;</span> -->

    <UiIcon class="toast__icon" :icon="iconName" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
  import UiIcon from './UiIcon.vue';

  export default {
    name: 'TheToast',

    props: {
      message: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
        validator: (value) => ['success', 'error'].includes(value),
      },

      timeout: {
        type: Number,
        default: 5000,
      },

      manualClose: {
        type: Boolean,
        default: false,
      }
    },

    emits: ['remove'],

    computed: {
      iconName() {
        switch(this.type) {
          case 'success':
            return 'check-circle';

          case 'error':
            return 'alert-circle';
        }
      },

      className() {
        switch(this.type) {
          case 'success':
            return 'toast_success';

          case 'error':
            return 'toast_error';
        }
      }
    },

    mounted() {
      setTimeout(() => this.$emit('remove'), this.timeout);
    },

    components: { UiIcon },
  }
</script>

<style scoped>
  .toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
  }

  .toast + .toast {
    margin-top: 20px;
  }

  .toast__icon {
    margin-right: 12px;
  }

  .toast.toast_success {
    color: var(--green);
  }

  .toast.toast_error {
    color: var(--red);
  }
</style>
