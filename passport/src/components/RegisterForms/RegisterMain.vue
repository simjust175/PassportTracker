<template>
 <v-container class="d-flex align-center bg-transparent justify-center" fluid>
        <v-card class="px-10 bg-transparent" :min-width="widthByScreen" elevation="0">
            <!-- <contact-main /> -->
            <register-form v-if="!hasAccount" @login="hasAccount = true" />

            <LoginForm v-else @signIn="hasAccount = false" @forgotActive="forgot = $event"
                v-bind="$attrs" />
            
            <v-divider class="my-sm-8 mb-xs-0 mt-xs-8" v-if="!forgot">or</v-divider>

            <div v-if="!forgot">
                <alternative-methods />
            </div>

        </v-card>
    </v-container>
</template>

<script setup>
import LoginForm from "../RegisterForms/LoginForm.vue"
import RegisterForm from '../RegisterForms/RegisterForm.vue'
import { ref, computed } from "vue"
import { useDisplay } from 'vuetify'
const { name } = useDisplay()

const props = defineProps({
        loginTriggered: Boolean
    })
    
const hasAccount = ref(true)
const forgot = ref(false)


const widthByScreen = computed(() => {
    console.log(name.value)
  switch (name.value) {
    case 'xs':
      return 350;
    case 'sm':
      return 450;
    default:
      return 500;
  }
});

</script>

<style></style>
