<template>
  <div class="d-flex flex-column">
    <snack-bar banner="true" color="success" label="Document Successfully added"/>
    <!-- <v-card class="rounded-6 elevation-5 mt-8"> -->
      <main-page />
    <!-- </v-card> -->
    <div class="mt-4 d-flex align-center justify-center">
      <drag-file />
    </div>
  </div>
</template>

<script setup>
import MainPage from "../components/Main-page/MainPage.vue"
//
</script>
