<template>
    <div>
        <v-autocomplete :label="props.menuItems.label" rounded="lg" :items="props.menuItems.items" :rules="rules" v-model="selection" variant="outlined" density="comfortable"></v-autocomplete>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
const props = defineProps({
    menuItems: Object
})

const emit = defineEmits(["selection"])
const selection = ref("")
const rules = ref([value => !!value || 'Required field']);

watch(selection, (newVal) => emit("selection", newVal))
</script>