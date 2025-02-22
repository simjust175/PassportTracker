<template>
    <div>
        <register-input label="Enter Email" type="email" @input="userEmail = $event" v-if="!userEmail" />
        <div class="me-n2 text-center d-flex flex-column mb-4 align-center justify-space-between" v-else>
            <v-btn density="comfortable" class="ml-auto" icon="$close" variant="plain" @click="$emit('close')"></v-btn>

            <h3 class="text-h6 mb-4">Verify Your Account</h3>
            <div class="text-body-2">{{ OTPLabel }}</div>
        </div>


        <v-form v-if="userEmail">
            <v-otp-input :label="OTPLabel" v-model="OTPcode" variant="outlined" color="surface"></v-otp-input>
        </v-form>

        <div class="d-flex justify-center">
            <v-btn class="my-4" color="success" height="40" variant="flat" size="large" width="100%">{{ buttonText }}</v-btn>
        </div>

        <div class="text-caption" v-if="userEmail">
            Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";

// const props = defineProps({
//     forgot: Boolean
// })

const userEmail = ref("");
//const userEmail = localStorage.getItem("user_email");

const OTPcode = ref("");

const OTPLabel = computed(() => `Enter the OTP sent to email: ${userEmail.slice(0, 4)}*******  Please check your email and paste the code below`)

watch(OTPcode, (val) => {
    if (val.length >= 6) {
        console.log("RUN OTP!!");
    }
})

const buttonText = computed(()=> userEmail.value ? 'Verify' : 'Send one time passport')

// watch(props.forgot, (newVal)=>{
//     forgotPwd.value = newVal;
// })

</script>

<style></style>