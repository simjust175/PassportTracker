<template>
  <div class="text-center">
    <v-select v-model="methodSelection" :items="props.menuItems?.items" :label="props.menuItems?.label" :rules="rules" rounded="lg"
      variant="outlined" density="comfortable">
    </v-select>
  </div>
</template>


<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  menuItems: Object
});

const rules = computed(() =>
  props.menuItems.label === 'Reminder period' ?
    [] :
    [value => !!value || 'Required field']
);
const methodSelection = ref("");
const emit = defineEmits(["selection"]);

watch(methodSelection, (newValue) => {
  emit("selection", newValue);
});


</script>