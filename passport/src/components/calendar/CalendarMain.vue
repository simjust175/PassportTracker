<template>
    <v-row class="fill-height">
      <v-col>
        <v-sheet class="bg-blue" min-width="800">
          <v-calendar
            ref="calendar"
            v-model="today"
            :events="events"
            color="primary"
            type="day"
            hide-week-number
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </template>
  <script>
  import { useDate } from 'vuetify'
  
  export default {
    data: () => ({
      today: [],
      focus: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      const adapter = useDate()
      this.fetchEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
      this.highlightToday();  // Highlight today's date when the component is mounted
    },
    methods: {
      getEventColor (event) {
        return event.color
      },
      fetchEvents ({ start, end }) {
        const events = []
        const min = start
        const max = end
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)
  
        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)
  
          events.push({
            title: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            allDay: !allDay,
          })
        }
  
        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      highlightToday() {
        const today = new Date().getDate();  // Get the current date number
        const days = document.querySelectorAll('.v-calendar-month__day'); // Select all days in the month view
        console.log("today", days)
        days.forEach(day => {
          const dayNumber = parseInt(day.textContent);  // Get the day number from each cell
          if (dayNumber === today) {
            console.log("it is tody!", day)
            day.style.backgroundColor = 'blue'; // Apply your custom background color
            day.style.color = 'white'; // Optional: change text color for contrast
          }
        });
      },
    },
    watch: {
      // Re-run the highlightToday function if the calendar is changed (e.g., month change)
      today: 'highlightToday',
    },
  }
  </script>
  

  <style>
.v-calendar-weekly__head-weekday, .v-calendar-weekly__head-weekday-with-weeknumber {
  background: #f3faff;
  font-size: 10px;
  border-bottom: solid, 1px, #000;
}

/*.v-calendar-month__weeknumber{
  background: red;
  opacity: 0;
   display: none  
}*/

.v-calendar-header{
  justify-content: center;
}

/* .v-calendar-month__day{
  background: blue;
} */

.v-calendar-weekly__day-label__today{
  color: green;
}

.v-calendar-weekly__day-label .v-btn .v-calendar-weekly__day-label__today{
  background: none;
}

button .v-btn .v-calendar-weekly__day-label__today{
background-color: green !important;
}
</style>