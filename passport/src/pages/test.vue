<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card class="pa-10">
          Vuex
          <h2 class="bg-blue">Store: {{ storeItems }}</h2>
          <h2 class="bg-green">LocalStorage: {{ fromLocal }}</h2>

          <v-btn @click="runTest" color="green-lighten-3"
            >TEST store 🏪🛍️🛒</v-btn
          >

          <v-btn @click="deleteTest" color="red-lighten-3"
            >❌❌delete</v-btn
          ></v-card
        >
      </v-col>
      <v-col cols="6">
        <v-card class="pa-10">
          PINIA
          <h2 class="bg-blue">Store: {{ pinia.token }}</h2>
          <v-btn @click="testPinia">Set pinia 🍍🍍</v-btn>
          </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="bg-blue-lighten-2 pa-8" variant="outlined">
          <h1>{{obj.name}}</h1>
          <h3>{{ obj.age }}</h3>
          <h6>{{obj.address}}</h6>
          <h5>{{obj.job}}</h5>
          <v-card-actions>
            <v-btn icon="mdi-delete" color="red" @click="clearObj"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import store from "@/Storage";
import { reactive, computed } from "vue";
import { setLogin } from "@/stores/loginState"
const pinia = setLogin()

const runTest = () => {
  const payload = {
    testA: "bla bla",
    testB: "Success",
    userName: "bunim frankel",
  };
  store.commit("runStoreTest", payload);
  localStorage.setItem("test", payload.userName);
  console.log(store.state);
};

const deleteTest = () => {
  store.commit("runStoreTest", { testA: "", testB: null });
};

const testPinia = ()=>{
    pinia.$patch({
        token: "dcs3247rf@",
        userName: "yanky panky"
    })
}



const storeItems = computed(() => store.state.userName);
const fromLocal = computed(() => localStorage.getItem("test"));


/////////////////////////////////////////////////////////////////////////
const obj = reactive({
  name: "yackov",
  age: 39,
  address: "shamgar 12",
  job:{
    type: "toilets",
    position: "manager"
  }
})

const clearObj = ()=>{
  Object.assign(obj, {
    name: "", age: "", address: "", job:{
    type: "",
    position: ""
  }
  })
}
</script>
