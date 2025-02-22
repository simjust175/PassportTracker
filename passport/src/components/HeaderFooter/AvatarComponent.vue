<template>
    <div class="main">
      <v-container v-if="!loading" fluid>
        <v-row justify="center">
          <v-menu min-width="200px">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" class="bg-green">
                <v-avatar color="green" size="x-large" elevation="8">
                  <span class="text-h6">{{ initializer(user.user_name) }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card class="px-4 py-3">
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar color="brown" class="my-2">
                    <span class="text-h5">{{ initializer(user.user_name) }}</span>
                  </v-avatar>
                  <h3>{{ enhanceText(user.user_name) }}</h3>
                  <p class="text-caption mt-1">{{ user.user_email }}</p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn variant="text" rounded>
                    Edit Account
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
      <v-progress-circular color="success" indeterminate :size="49" :width="3" v-else></v-progress-circular>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from "vue"
  const props = defineProps({
    user: Object
  })

  const loading = ref(false);
  const split = (txt)=> txt.split(" ")
  const enhanceText = (txt) => {
    if(!txt) return null
    if (txt.includes("_")){ txt= txt.replace("_", " ")}
    txt = split(txt)
    return txt.map(name => name.charAt(0).toUpperCase() + name.slice(1, name.length)).join(" ")
}

const initializer = (name)=> {
    if(!name) return null
    return (name.slice(0, 1) + split(name)[split(name).length -1].slice(0, 1)).toUpperCase();
}

watch(()=> props.user, ()=> console.log("trigged triggRED TRIGGRED!!!"))
onMounted(()=> {loading.value = true
    setTimeout(() => {
    loading.value = false;
  }, 1000)})
</script>