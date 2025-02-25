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
import { onMounted, ref } from "vue";

import { useRouter } from 'vue-router';
const router = useRouter();

import store from "@/Storage";

const loading = ref(false)
const loggedIn = ref(false)
const loggedInInfo = {
  user_id: localStorage.getItem("user_id"),
  token: localStorage.getItem("token"),
};


//behind the scenes extra validation
async function validateToken() {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register/validateToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loggedInInfo),
  });
  const isTokenValid = await res.json();
  console.log("is the token valid:", isTokenValid.Success ? true : false);
  return isTokenValid.Success ? true : false;
}

function isTokenExpired(token) {
  const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
  const expiry = decoded.exp * 1000; // Convert to milliseconds
  return Date.now() > expiry; // Check if the token is expired
}


onMounted(async () => {
  // Check if token has been validated before
  const isExpired = isTokenExpired(localStorage.getItem("token"))
  
  const isTokenValidated = localStorage.getItem("isTokenValidated");
  if (isTokenValidated === "true") {
    loggedIn.value = true;
    return;
  }

  const isValid = await validateToken();
  if (isExpired || !isValid) {
    console.log("Did the token expire:", isExpired)
    router.push("/register");
  } else {
    loggedIn.value = true;
    localStorage.setItem("isTokenValidated", "true");
    store.commit("updatedLoginStat", true, loggedInInfo.user_id);
  }

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});

</script>
