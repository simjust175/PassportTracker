<template>
  <main>
    <v-progress-circular color="success" indeterminate :size="150" :width="2" v-if="loading"></v-progress-circular>
    <empty-state v-else-if="!loading && !Object.values(docStore.dbResponse).length" v-bind="$attrs"/>
    <reminder-main :documents="savedDocuments"  v-else/>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { setLogin } from "@/stores/loginState"
import { documents } from "@/stores/documentState"
const loginInfo = setLogin()
const docStore = documents()

const loading = ref(false)
let savedDocuments = computed(()=> docStore.dbResponse)
const loader = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
const fetchReminders = async () => {
  loader()
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/doc/get/${loginInfo.token}`, {
    headers: {
      Authorization: `Bearer ${loginInfo.token}`
    }
  })
  const data = await res.json()
  console.log("get data", data.doc);
  docStore.$patch({ dbResponse: { ...data.doc} })

  console.log(docStore.dbResponse, "&", Object.values(docStore.dbResponse).length);
}

onMounted(() => fetchReminders())

</script>

<style></style>