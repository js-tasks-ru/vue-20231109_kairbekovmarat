<template>
  <UiInput ref="input-date" :type="type" :step="step" v-model="modelValueProxy">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',
  components: {
    UiInput
  },

  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      }
    },

    modelValue: {
      type: Number,
    },

    step: {
      type: String,
    },
  },

  computed: {
    formattedDate() {
      const date = new Date(this.modelValue);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();

      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },

    formattedTime() {
      const date = new Date(this.modelValue);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    },

    formattedDateTime() {
      return `${this.formattedDate}T${this.formattedTime}`;
    },

    modelValueProxy: {
      get() {
        switch(this.type) {
          case 'date':
            return this.formattedDate;
          case 'time':
            return this.formattedTime;
          case 'datetime-local':
            return this.formattedDateTime;
        }
      },

      set() {
        this.$emit('update:modelValue', this.$refs['input-date'].$refs['input'].valueAsNumber);
      }
    },
  },
};
</script>
