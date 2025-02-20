<template>
   <v-app-bar scroll-behavior="elevate inverted" class="bg-transparent mb-10 mr-10" height="50">
        <v-toolbar-title>
          <!-- <v-img src="../../public/images/logo-blu.png" max-width="40"></v-img> -->
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <avatar-component :user="user"/>
      </v-app-bar>
</template>

<script setup>
import AvatarComponent from "./AvatarComponent.vue"
const props = defineProps({
  user: Object
})
//
</script>

<style>

</style>