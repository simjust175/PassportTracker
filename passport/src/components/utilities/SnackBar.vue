<template>
    <v-snackbar :timeout="2000" elevation="24" v-model="banner" class="d-flex">
              {{ props.label }}
              <v-btn color="blue" variant="text" @click="banner = false">
                  Close
              </v-btn>
          </v-snackbar>
  </template>
  
  <script setup>
  import  { ref } from "vue";
  const props = defineProps({
      banner: Boolean,
      label: String,
      color: String
  });
  const banner = ref(props.banner)
  
  
  </script>
  
  <style>
  
  </style>