import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      numA: 0,
      numB: 0,
      operator: 'sum',
    };
  },

  computed: {
    calculatedNumber() {
      switch(this.operator) {
        case 'sum':
          return this.numA + this.numB;

        case 'subtract':
          return this.numA - this.numB;

        case 'multiply':
          return this.numA * this.numB;

        case 'divide':
          return this.numA / this.numB;

        default:
          return NaN;
      }
    }
  }
});

app.mount('#app');
