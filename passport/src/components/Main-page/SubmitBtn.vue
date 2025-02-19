<template>
    <v-btn append-icon="mdi-send-outline" variant="flat" color="success" :loading="props.loadingState"> Confirm & Send</v-btn>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
    checkedInfo: Object,
    loadingState: Boolean
})

const emit = defineEmits(["submitted"]);

watch(() => props.loadingState, (newVal) => {
    if(!newVal) return null;
    validateInfo()
})

const validateInfo = () => {
    let info = {...props.checkedInfo}
    // const values = Object.values(info);
    //console.log("INFO INFO INFO", info);
    // const isValid = values.slice(0, -1).every(value => value && value !== '');
    // if (!isValid) return null
    // const { surname, first_name, middle } = info.user_name;
    // info.user_name = `${surname} ${first_name}${middle ? middle : ''}`;
    //console.log("in the object", p);
    postInfo(info)
}

let num = 0
const postInfo = async(credentials) => {
    num ++
    console.log("called", num);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/doc/post/${localStorage.token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const data = await res.json()
    //console.log("DATATATATATATATATATA", data);
    //emit("submitted")
}
</script>
