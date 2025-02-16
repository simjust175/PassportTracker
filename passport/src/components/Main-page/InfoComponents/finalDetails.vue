<template>
    <div>
        <v-container fluid>
            <v-checkbox v-model="sixMonths" label="Expires six month in advance"></v-checkbox>
            <!-- <v-checkbox v-model="" label="Priority Shipping"></v-checkbox>
            <v-checkbox v-model="" label="Express Shipping"></v-checkbox> -->
        </v-container>
    </div>
</template>

<script setup>
import { ref } from "vue";

const sixMonths = ref(false);


</script>

<style></style>