import { reactive } from "vue";
import { defineStore } from "pinia";

export const documents = defineStore(
  "documentState",
  () => {
    // state
    const dbResponse = reactive({});

    //Returns
    return {
     dbResponse,
    };
  },
  {
    persist: true,
  }
);