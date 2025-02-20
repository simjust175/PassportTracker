<template>
    <div>
    <h2 class="text-center mb-4">Log in</h2>
    <v-form ref="formData">
        <alert-prop :alert="alertActivate" type="error" label="User name or password are incorrect" :closable="true" />
        <alert-prop label="Email must be provided" type="error" :alert="toggleAlert" />
        <register-input label="Enter Email" type="email" @input="credentials.user_email = $event" />

        <p @click="emitForgot" class="cursor-pointer text-blue-darken-4 text-body-2 text-right">Forgot password?</p>
        <register-input label="Enter Pwd" type="pwd" @input="credentials.pwd = $event" v-model="credentials.pwd" />
        <v-btn @click.prevent="login" class="my-4" size="large" color="purple" block>Login</v-btn>
    </v-form>
    <p>Not yet a member? <span @click="$emit('signIn')" class="cursor-pointer text-blue-darken-4">Sign up</span> </p>
    </div>
</template>

<script setup>
import { ref, reactive, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
import store from "@/storage"

const alertActivate = ref(false)
const router = useRouter()
const formData = ref("");
const toggleAlert = ref(false);
const credentials = reactive({
    user_email: "",
    pwd: ""
});
;

const emit = defineEmits(["forgot", "loggedIn"]);

const validate = async () => {
    const { valid } = await formData.value.validate();
    if (valid) return true;
}

const login = async () => {
    // const isValid = await validate();
     // if (!isValid) return null;
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    try {
        const {  newToken: {user_id, newToken: { token} } } = await res.json();
        console.log("userid", user_id);
        if (!token) return alertActivate.value = true;
        localStorage.setItem("token", token);
        localStorage.setItem("id", user_id);
        
    store.commit("updateLoggedStat", { loggedInStatus: true, userName: credentials.user_email })
        emit("loggedIn");
        router.push("/");
    } catch (error) {
        alertActivate.value = true;
    }

}

//forgot
const emitForgot = async () => {
    console.log("creeds", credentials.user_email);
    if (!credentials.user_email) {
        toggleAlert.value = true
    } else {
        toggleAlert.value = false
        emit("forgot");
    }
};

watch(credentials.pwd, (newVal) => {
    console.log("newVal");
    if (newVal.length > 0) {
        toggleAlert.value = false
    }
})

</script>

<style></style>