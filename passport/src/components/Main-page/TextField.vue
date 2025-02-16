<template>
  <div>
    <v-text-field :label="props.label" v-model="name" variant="outlined" class="rounded-7" rounded="lg" :rules="rules"></v-text-field>
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
const name = ref("")
watch(name, (newVal)=> {emit("selection", newVal)})
</script>

<style>

</style>