<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card rounded="lg">
      <!-- <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          {{ props.title }}
        </div>
        <v-divider class="mt-2"></v-divider>
        <v-btn icon="mdi-close" variant="text" @click="isActive.value = false" ></v-btn>
      </v-card-title> -->

      <!-- <v-divider class="mb-4"></v-divider> -->

      <v-card-text class="px-6">
        {{ props.text }}
      </v-card-text>

      <!-- <v-divider class="mt-2"></v-divider> -->

      <v-card-actions class="d-flex justify-end">
        <v-btn class="text-none" rounded="xl" text="Cancel" @click="emitCancel"></v-btn>

        <v-btn class="text-none" color="primary" rounded="lg" text="OK" variant="outlined"
          @click="confirmLogout"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
import { ref, watch } from "vue";
import { setLogin } from "@/stores/loginState"
const loginInfo = setLogin()
const emit = defineEmits(["cancel", "loggedOut"]);

const props = defineProps({
  activateDialog: Boolean,
  title: String,
  text: String,
});
const logout = async()=> {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/register/logout/${localStorage.getItem("user_id")}`,{
      method: "POST"
    }
  ) 
    const data = await res.json()
    emit("loggedOut")
    localStorage.clear()
    loginInfo.$reset()
    console.log("what sin Pinia state", loginInfo)
    console.log("is localStorage clear:", localStorage, "how about the store?", store.state)
    console.log("logged out", data)
}

//const dialog = computed(()=> props.activateDialog);
const dialog = ref(false);
const confirmLogout = () => {
  dialog.value = false
  logout()
 
}
const emitCancel = () => {
  dialog.value = false
}

watch(() => props.activateDialog, (newVal) => {
  console.log("props update: ", newVal);
  dialog.value = newVal;
})

</script>
