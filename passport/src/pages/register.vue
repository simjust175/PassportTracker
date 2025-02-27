<template>
    <main theme="light">
        <!-- <v-btn icon="mdi-close" size="x-large" variant="plain" class="position-absolute top-0 left-0" @click="router.push('/')"></v-btn> -->
        <RegisterMain />
    </main>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router';
import RegisterMain from '@/components/RegisterForms/RegisterMain.vue';


const router = useRouter();
const theme = useTheme();
</script>

<style></style>