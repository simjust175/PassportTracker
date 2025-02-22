<template>
  <v-app theme="light" class="pb-0 bg-grey-blue">

    <navigation-bar />
    <avatar-component :user="userInfo" class="align-self-end pb-0 pt-5 pr-5" />
    <v-main class="d-flex align-center justify-center mt-10 pb-8">
      <router-view />
    </v-main>
    <footer-comp height="2" class="pa-0 pb-0" />
  </v-app>
</template>

<script setup>
import AvatarComponent from "./components/HeaderFooter/AvatarComponent.vue"
import { ref } from "vue"

const userInfo = ref({
  user_email: "bunim175@gmail.com",
  user_name: "simcha justman",
})
//
</script>

<style>
.bg-grey-blue{
  background-color: #F3FAFFFF !important;
}
</style>
