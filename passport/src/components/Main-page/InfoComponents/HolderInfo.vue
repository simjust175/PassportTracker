<template>
    <v-row>
        <v-col cols="12">
            <text-field label="Surname" @selection="user_name.surname = $event" />
        </v-col>
        <v-col cols="12">
            <text-field label="Middle name (optional)" @selection="user_name.middle = $event" />
        </v-col>
        <v-col cols="12">
            <text-field label="First name" @selection="user_name.first_name = $event" />
            <!-- <text-field label="First name" @selection="info.user_name.first_name = $event" /> -->
        </v-col>
    </v-row>
</template>

<script setup>
import { reactive, watch } from 'vue' 

const user_name = reactive({
    first_name: "",
    middle: "",
    surname:""
})

const emit = defineEmits(["selection", "success"])

watch(user_name, (newVal)=> {if(user_name.first_name && user_name.surname) {emit('selection', newVal)
 emit("success")}});
</script>

<style></style>