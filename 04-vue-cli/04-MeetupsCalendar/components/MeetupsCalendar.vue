<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="setPrevMonth"></button>

        <div class="calendar-view__date">
          {{ currentMonth }}
        </div>

        <button class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="setNextMonth"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <MeetupsCalendarCell v-for="day in calendarDays"
        :date="day.date"
        :inactive="day.inactive"
        :meetups="getMettupsByDate(day.date)" />
    </div>
  </div>
</template>

<script>
import MeetupsCalendarCell from './MeetupsCalendarCell.vue';

export default {
  name: 'MeetupsCalendar',

  components: { MeetupsCalendarCell },

  data() {
    return {
      date: new Date(),
      groupedMeetups: {},
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  watch: {
    meetups: {
      handler(value) {
        const groupedMeetups = {};

        this.meetups.forEach(meetup => {
          const meetupDate = new Date(meetup.date)
          const meetupDateKey = `${meetupDate.getFullYear()}-${meetupDate.getMonth()}-${meetupDate.getDate()}`;

          if(groupedMeetups[meetupDateKey] === undefined) {
            groupedMeetups[meetupDateKey] = [];
          }

          groupedMeetups[meetupDateKey].push(meetup);
        });

        this.groupedMeetups = groupedMeetups;
      },

      immediate: true,
    }
  },

  computed: {
    currentMonth() {
      return this.date.toLocaleDateString(navigator.language, {
        year: "numeric",
        month: "long",
      });
    },

    calendarDays() {
      // Вычисляем первый и последний день этого месяца
      const monthFirstDayDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0);
      const monthLastDayDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0);

      // Вычисляем сколько дней нужно забрать с прошлого и следующего месяца
      const prevMonthDayLength = !monthFirstDayDate.getDay() ? 6 : monthFirstDayDate.getDay() - 1;
      const nextMonthDayLength = !monthLastDayDate.getDay() ? 0 : 7 - monthLastDayDate.getDay();

      const calendarDays = [];

      // Добавляем даты из прошлого месяца
      if(prevMonthDayLength != 0) {
        for(let i = prevMonthDayLength; i > 0; i--) {
          calendarDays.push({
            date: new Date(monthFirstDayDate.getTime() - (86400000 * i)),
            inactive: true,
          });
        }
      }

      for(let i = monthFirstDayDate.getDate(); i <= monthLastDayDate.getDate(); i++) {
        calendarDays.push({
          date: new Date(this.date.getFullYear(), this.date.getMonth(), i, 0, 0, 0),
          inactive: false,
        });
      }

      // Добавляем даты из следующего месяца
      if(nextMonthDayLength != 0) {
        for(let i = 1; i <= nextMonthDayLength; i++) {
          calendarDays.push({
            date: new Date(monthLastDayDate.getTime() + (86400000 * i)),
            inactive: true,
          });
        }
      }

      return calendarDays;
    }
  },

  methods: {
    getMettupsByDate(date) {
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      return this.groupedMeetups[dateKey] !== undefined ? this.groupedMeetups[dateKey] : [];
    },

    setPrevMonth() {
      const isJanuary = this.date.getMonth() == 0;

      this.date = new Date(
        isJanuary ? this.date.getFullYear() - 1 : this.date.getFullYear(),
        isJanuary ? 11 : this.date.getMonth() - 1
      );
    },

    setNextMonth() {
      const isDecember = this.date.getMonth() == 11;

      this.date = new Date(
        isDecember ? this.date.getFullYear() + 1 : this.date.getFullYear(),
        isDecember ? 0 : this.date.getMonth() + 1
      );
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
