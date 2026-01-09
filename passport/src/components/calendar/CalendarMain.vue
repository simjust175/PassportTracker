<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet class="bg-blue" min-width="800">
        {{ documents[0] ? new Date(documents[0].date).toString() : "no dates availble!" }}
        <v-calendar
        @click:toToday="console.log('today activated')"
          ref="calendar"
          v-model="today"
          :events="events"
          color="primary"
          view-mode="month"
          hide-week-number
        />
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import { useDate } from "vuetify";

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    documents: Array,
  },
  data: () => ({
    today: [new Date()],
    focus: "",
    events: [],
    colors: ["red"]
  }),
  mounted() {
    const adapter = useDate();
    this.fetchEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
    this.highlightToday(); // Highlight today's date when the component is mounted
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    fetchEvents({ start, end }) {
      const events = [];
      // const min = start;
      // const max = end;
      // const days = (max.getTime() - min.getTime()) / 86400000;
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + secondTimestamp);


      const docs = Object.values(this.documents);
      // docs.forEach((event) => {
      //   events.push({
      //     title: event.title,
      //     start: new Date(event.date).toString(),
      //     end: new Date(event.date).toString(),
      //     color: "red",
      //     allDay: true,
      //   });
      // });
      console.log("🥐🥞🧂🌭🛒❌❌❌", docs);
      this.events = events;
      console.log("events in calendar", events[0]);
    },
    highlightToday() {
      const today = new Date()// Get the current date number
      const days = document.querySelectorAll(".v-calendar-month__day"); // Select all days in the month view
      const currentMonth = document.querySelector(".v-calendar-header__title");
      console.log("today", currentMonth.textContent);
      days.forEach((day) => {
        // console.log("day", this.today, day)
        const dayNumber = parseInt(day.textContent); // Get the day number from each cell
        if (dayNumber === today) {
          day.style.backgroundColor = "#f3faffff"; // Apply your custom background color
          day.style.color = "blue"; // Optional: change text color for contrast
        }
      });
    },
  },
  watch: {
    // Re-run the highlightToday function if the calendar is changed (e.g., month change)
    today: "highlightToday",
  },
};
</script>

<style>
.v-calendar-weekly__head-weekday,
.v-calendar-weekly__head-weekday-with-weeknumber {
  background: #f3faff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin-bottom: 3px;
  border-bottom: 1px solid #000;
}

.v-calendar-weekly__day-label .v-btn.v-calendar-weekly__day-label__today {
  background-color: transparent !important;
  box-shadow: none !important;
}

/*.v-calendar-month__weeknumber{
  background: red;
  opacity: 0;
   display: none  
}*/

.v-calendar-header {
  justify-content: center;
}

/* .v-calendar-month__day{
  background: blue;
} */

.v-calendar-weekly__day-label__today {
  color: green;
}

.v-calendar-weekly__day-label .v-btn .v-calendar-weekly__day-label__today {
  background: none;
}

button .v-btn .v-calendar-weekly__day-label__today {
  background-color: green !important;
}
</style>
