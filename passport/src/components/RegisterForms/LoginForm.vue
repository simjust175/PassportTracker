<template>
    <log-in v-if="!forgotStat" @forgot="forgotStat = true" v-bind="$attrs"/>
    <ForgotPwd @close="forgotStat = false" v-else/>
</template>

<script setup>
import ForgotPwd from "./ForgotPwd.vue"
import LogIn from "./LogIn.vue";
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["forgotActive"])

const forgotStat = ref(false);
watch(forgotStat , (newVal)=>{
    console.log("forgotActive", newVal);
    emit("forgotActive", newVal);
})

</script>

<style></style>