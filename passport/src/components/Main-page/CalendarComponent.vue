<template>
  <div class="d-flex justify-center">
    <v-date-input 
      v-model="model" 
      prepend-icon=""
      prepend-inner-icon="$calendar" 
      label="Expiration Date"
      variant="outlined"
      density="comfortable" 
      rounded="lg" 
      :rules="rules"
      :min="pastDates"
    ></v-date-input>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  sixMonths: Boolean
});

const emit = defineEmits(["selection"]);

const rules = ref([value => !!value || 'Required field']);
const model = ref(null);
const expiryPeriod = ref('today'); // 'today' or 'sixMonthsAhead'
const date = ref(new Date()); // Current date

// Compute the periods for 'today' and 'sixMonthsAhead'
const period = computed(() => {
  const today = new Date(date.value);
  const sixMonthsAhead = new Date(today.setMonth(today.getMonth() + 6));
  return {
    today: new Date(date.value),
    sixMonthsAhead: sixMonthsAhead
  };
});

// Compute the min date ('today' or 'sixMonthsAhead') based on the prop
const pastDates = computed(() => {
  const selectedDate = period.value[expiryPeriod.value];
  return selectedDate.toISOString().split('T')[0]; // Return the date in YYYY-MM-DD format
});

// Watch for changes in the `model` to emit the selected date
watch(model, (newVal) => {
  console.log("new model value: ", newVal);
  if (newVal) {
    const selectedDate = new Date(newVal);
    //model.value = selectedDate.toISOString().split('T')[0]; // Keep the date format consistent
    emit("selection", selectedDate);
  }
});

// Watch for changes in the `sixMonths` prop
watch(() => props.sixMonths, (newVal) => {
  console.log("Six months prop changed: ", newVal);
  expiryPeriod.value = newVal ? 'sixMonthsAhead' : 'today'; // Adjust the expiration period
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
