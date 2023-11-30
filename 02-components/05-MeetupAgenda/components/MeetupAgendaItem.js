import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  computed: {
    agendaTitle() {
      return this.agendaItem.title ?? agendaItemDefaultTitles[this.agendaItem.type];
    },

    agendaIconUrl() {
      return `/assets/icons/icon-${this.agendaIcon}.svg`;
    },

    agendaIcon() {
      return agendaItemIcons[this.agendaItem.type];
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agendaIconUrl" class="icon" :alt="agendaIcon" />
      </div>
      <div class="agenda-item__col">
        {{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}
      </div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">
          {{ agendaTitle }}
        </h3>

        <p class="agenda-item__talk" v-if="agendaItem.type === 'talk'">
          <span v-if="agendaItem.speaker">
            {{ agendaItem.speaker }}
          </span>

          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">
            {{ agendaItem.language }}
          </span>
        </p>

        <p v-if="agendaItem.description">
          {{ agendaItem.description }}
        </p>
      </div>
    </div>`,
});
