<template>
    <v-list-item prepend-icon="mdi-export" title="Logout" value="logout" class="bg-green"
          rounded="lg" @click="logOut"></v-list-item>
</template>

<script setup>

const logOut = async()=> {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register/logOut/${localStorage.getItem("token")}`) 
    const data = await res.json()
}
</script>