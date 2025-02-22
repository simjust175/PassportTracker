<template>
  <div>
  <h2 class="text-center mb-3">Create your account</h2>
  <v-form ref="formData">
    <alert-prop :alert="activateAlert" type="error" label="User name or password are incorrect" :closable="true"/>
    <register-input label="Enter Name" type="name"  @input="credentials.user_name = $event"/>
    <register-input label="Enter Email" type="email"  @input="credentials.user_email = $event"/>
    <register-input label="Enter password" type="pwd" @input="pwd1 = $event"/>
    <register-input label="Re-Enter password" type="pwd2" @input="pwd2 = $event" :pwd1="pwd1"/>
    <v-btn size="large" color="success" @click.prevent="register" block>Get started</v-btn>
    <div class="mt-4">
      <p>Have a account? <span @click="this.$emit('login')" class="cursor-pointer text-blue-darken-4">Log in</span></p>
    </div>
  </v-form>
</div>
</template>

<script setup>

import { ref, reactive, defineEmits } from "vue";

const emit = defineEmits(["login"])

//Function to validate password
const isPasswordValid = (pwd) => { return /[A-Za-z]/.test(pwd) }

// Function to validate password match and strength
const passwordValidator = (pwd1, pwd2) => {
  if (pwd1 === pwd2 && isPasswordValid(pwd1)) {
    return pwd1;
  }
  throw new Error(`Invalid password!🥲😢😭`);
}

const activateAlert = ref(false) 
const formData = ref(null);
const pwd1 = ref("");
const pwd2 = ref("");
const credentials = reactive({
  user_name: "",
  user_email: "",
  pwd: ""
});


const validate = async () => {
  // const isPwdValid = passwordValidator(credentials);
  const { valid } = await formData.value.validate();
  if (!valid) return null;
   credentials.pwd = passwordValidator(pwd1.value, pwd2.value)
}

const register = async () => {
  const isFormValid = await validate();
  console.log("valid>>>>>>>>>>>>>>", isFormValid);
  //if(!isFormValid) return null
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });
  const data = await res.json()
  console.log("sign up data:", data);
  if(!data.Success) return activateAlert.value = true
  emit("login")
  console.log(data);
}

</script>

<style></style>