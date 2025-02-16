<template>
  <v-app theme="light">
    <app-bar />
    <v-main class="d-flex align-center justify-center bg-blue-lighten-5 pa-12">
      <router-view />
    </v-main>
    <footer-comp height="0" class="pa-0 pb-0" />
  </v-app>
</template>

<script setup>
  //
</script>

