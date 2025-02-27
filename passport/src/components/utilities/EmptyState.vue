<template>
    <v-empty-state image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png">
      <template v-slot:title>
        <div class="text-subtitle-2 mt-8">
          No Documents Saved Yet
        </div>
      </template>
  
      <template v-slot:text>
        <div class="text-caption">
          Add documents using the form or log in with another user.
        </div>
      </template>
  
      <template v-slot:actions>
        <v-btn
          class="text-none"
          color="white"
          elevation="1"
          rounded="lg"
          size="small"
          text="Add document"
          width="175"
          @click="$router.push('/')"
        ></v-btn>
  
        <v-btn
          class="text-none"
          elevation="1"
          rounded="lg"
          size="small"
          text="Login with another user"
          width="175"
          @click="activateDialog = !activateDialog"
        ></v-btn>
      </template>
      <logout-dialog :activateDialog="activateDialog" title="Confirm Log-out" text="Are you sure?" @cancel="activateDialog = false" v-bind="$attrs"/>
    </v-empty-state>
  </template>

  <script setup>
import { ref } from "vue"
// import LogoutDialog from "../"
const activateDialog = ref(false)
</script>