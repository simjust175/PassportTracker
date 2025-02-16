<template>
 <v-container class="d-flex align-center justify-center fill-height" :theme="light" fluid>
        <v-card class="px-10 py-10 bg-grey-lighten-6" width="380" max-width="440">
            <!-- <contact-main /> -->
            <LoginForm v-if="loginActive" @signIn="loginActive = false" @forgotActive="forgot = $event"
                v-bind="$attrs" />
            <register-form v-else @login="loginActive = true" />

            <v-divider class="my-sm-8 mb-xs-0 mt-xs-8" v-if="!forgot">or</v-divider>

            <div v-if="!forgot">
                <alternative-methods />
            </div>

        </v-card>
    </v-container>
</template>

<script>
import LoginForm from "../RegisterForms/LoginForm.vue"
import RegisterForm from '../RegisterForms/RegisterForm.vue'
export default {
    components: { LoginForm, RegisterForm },
    props: {
        loginTriggered: Boolean
    },
    data() {
        return {
            loginActive: false,
            forgot: false
        }
    }

}
</script>

<style></style>
