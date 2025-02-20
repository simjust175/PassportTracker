<template>
  <div>
    <v-text-field :label="props.label" v-model="name" density="comfortable" variant="outlined" class="rounded-7" rounded="lg" :rules="rules"></v-text-field>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
const props = defineProps({
    label: String
})
const rules = computed(() => 
  props.label === 'Middle name (optional)' ? 
  [] : 
  [value => !!value || 'Required field']
);
const emit = defineEmits(["selection"])
const capitalize = (str)=> str.charAt(0).toUpperCase() + str.slice(1);
const name = ref("")
watch(name, (newVal)=> {emit("selection", capitalize(newVal))})
</script>

<style>

</style>