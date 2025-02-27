<template>
  <div class="main">
    <v-container v-if="!loading" fluid>
      <v-row justify="center">
        <v-menu min-width="200px">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="green" size="x-large" elevation="8">
                <span class="text-h6">{{ initializer(loginInfo.userName) }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="px-4 py-3">
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="brown" class="my-2">
                  <span class="text-h5">{{ initializer(loginInfo.userName) }}</span>
                </v-avatar>
                <h3>{{ enhanceText(loginInfo.userName) }}</h3>
                <p class="text-caption mt-1">{{ user.user_email }}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  Some functionality? 🤔
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  Disconnect
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </v-container>

    <!-- Show loading indicator while loading -->
    <v-progress-circular color="success" indeterminate :size="49" :width="3" v-else></v-progress-circular>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { setLogin } from "@/stores/loginState"
const loginInfo = setLogin()

// Define reactive variables
const user = ref({})
const loading = ref(true) // Start loading initially

// Functions to manipulate text
const split = (txt) => txt.split(" ")

const enhanceText = (txt) => {
  if (!txt) return null
  if (txt.includes("_")) { txt = txt.replace("_", " ") }
  txt = split(txt)
  return txt.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" ")
}

const initializer = (name) => {
  if (!name) return null
  const nameParts = split(name)
  return (name.slice(0, 1) + nameParts[nameParts.length - 1].slice(0, 1)).toUpperCase()
}


// Fetch user data when component is mounted
onMounted(() => {
  // Simulate data loading (remove if unnecessary)
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>