<template>
  <v-app theme="light" class="pb-0 bg-grey-blue">
    <!-- <logout-dialog :activateDialog="true" title="Confirm Log-out" text="Are you sure?" @loggedOut="loader()"/> -->
    <navigation-bar
      @loggedOut="loader()"
      :drawerOpen="drawer"
      @screenChange="isScreenSmall = $event"
      v-if="loginInfo.token"
    />
    <div
      class="d-flex justify-space-between"
      :class="{ 'flex-row-reverse': !isScreenSmall }"
      v-if="loginInfo.token"
    >
      <v-btn
        icon="mdi-dots-horizontal"
        class="mt-2 ml-4"
        variant="outlined"
        @click="drawer = !drawer"
        v-if="isScreenSmall"
      ></v-btn>
      <avatar-component class="mt-1 mr-4" />
    </div>
    <v-main class="d-flex align-center justify-center mt-10 pb-8">
      <v-progress-circular
        class="position-absolute"
        color="success"
        indeterminate
        :size="80"
        :width="3"
        v-if="loading"
      ></v-progress-circular>
      <router-view @loggedOut="loader()" />
    </v-main>
    <footer-comp height="2" class="pa-0 pb-0" />
  </v-app>
</template>

<script setup>
import AvatarComponent from "./components/HeaderFooter/AvatarComponent.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { setLogin } from "@/stores/loginState";
const loginInfo = setLogin();

const isScreenSmall = ref(false);
const loading = ref(false);

const drawer = ref(false); //drawer v-model for when screen is small
const loader = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    router.push("/register");
  }, 1000);
};
</script>

<style>
.bg-grey-blue {
  background-color: #f3faffff !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fff !important;
  background: blue;
}
input#input-10.field_input {
  background: green;
}
</style>
