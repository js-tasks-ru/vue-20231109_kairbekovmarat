import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  data() {
    return {
      meetup: null,
      loading: false,
      error: false,
    };
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  watch: {
    meetupId: {
      handler(id) {
        this.error = false;
        this.loading = true;

        const meetupPromise = fetchMeetupById(id);

        meetupPromise.then(meetup => this.meetup = meetup);
        meetupPromise.catch(() => {
          this.meetup = null;
          this.error = true;
        });

        meetupPromise.finally(() => this.loading = false);
      },

      immediate: true,
    }
  },

  template: `
    <div class="page-meetup">
      <MeetupView :meetup="meetup" v-if="!loading && !error" />

      <UiContainer>
        <UiAlert v-if="loading">Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert v-if="error">error</UiAlert>
      </UiContainer>
    </div>`,
});
