<template>
    <v-row>
        <v-col cols="12">
            <method-dropdown :menuItems="documentType" @selection="document.type = $event" />
        </v-col>
        <v-col cols="12">
            <method-dropdown :menuItems="country" @selection="document.country = $event" />
        </v-col>
        <v-col cols="12" v-if="byState">
            <autocomplete-component :menuItems="states" @selection="document.state = $event" />
        </v-col>
        <v-col cols="12">
            <calendar-component @selection="document.date = $event" :sixMonths="document.six_months" />
        </v-col>
        <v-col cols="12" v-if="isPassport">
            <select-six @selection="document.six_months = $event" />
        </v-col>
    </v-row>
</template>

<script setup>
import { reactive, ref, watch, computed } from 'vue'
import MethodDropdown from '../MethodDropdown.vue';
import AutocompleteComponent from '../AutocompleteComponent.vue';

const document = reactive({
    type: "",
    country: "",
    state: null,
    date: "",
    six_months: false
})

const emit = defineEmits(["selection", "success"])

//watch(user_name, (newVal) => { if (user_name.first_name && user_name.surname) emit('selection', newVal) });

const isPassport = computed(() => document.type === 'Passport');
const byState = computed(() => {
    return document.country === 'United states' && ['Drivers license', 'I.D. card', 'Other'].includes(document.type);
});

const documentType = ref({
    label: "Choose document type",
    items: [
        "Passport",
        "I.D. card",
        "Drivers license",
        "Other",
        "Visa"
    ]
});

const country = ref({
    label: "Country",
    items: [
        "United states",
        "United kingdom",
        "Israel",
        "Belgium",
        "Switzerland",
        "Canada",
        "Austria",
        "Australia",
        "Germany",
        "Russia",
        "Ukraine"
    ]
});


const states = ref({
    label: "Enter state",
    items: [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
        "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
        "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ]
});

watch(document, (newVal)=> {
    const {type, country, state, date} = document;
    if (type && country && date) {
        console.log("passsed before state");
        if (country === "United states" && !state) return null
        console.log("passed after state");
        emit("selection", document);
        emit("success")
    } else {
        console.log("missing", newVal);
    }
})
</script>

<style></style>
