<template>
  <div class="d-flex flex-column">
    <snack-bar banner="true" color="success" label="Document Successfully added"/>
    <!-- <v-card class="rounded-6 elevation-5 mt-8"> -->
      <v-progress-circular color="success" indeterminate :size="150" :width="8" v-if="loading"></v-progress-circular>
      <main-page v-else/>
    <!-- </v-card> -->
    <div class="mt-4 d-flex align-center justify-center" v-if="!loading">
      <drag-file />
    </div>
  </div>
</template>

<script setup>
import MainPage from "../components/Main-page/MainPage.vue"
import { onMounted, ref } from "vue"

const loading = ref(false)

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000);
})
//
</script>
