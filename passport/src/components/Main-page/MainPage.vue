<template v-slot:default="{ prev, next }">
    <v-container min-width="800" fluid>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-item value="1" :complete="complete.first">
                    <template v-slot:title> Holder info </template>
                </v-stepper-item>

                <v-divider></v-divider>

                <v-stepper-item value="2" :complete="complete.second">
                    <template v-slot:title> Document info </template>
                </v-stepper-item>

                <v-divider></v-divider>

                <v-stepper-item :rules="[() => false]" value="3" :complete="complete.third">
                    <template v-slot:title> Save </template>
                </v-stepper-item>

                <v-divider></v-divider>
            </v-stepper-header>

            <v-stepper-window>
                <v-stepper-window-item value="1">
                    <!-- <template v-slot:item.1> -->
                    <h3 class="text-h6">Holder info</h3>
                    <v-sheet class="d-flex justify-center">
                        <holder-info @selection="info.user_name = $event" @success="disabled = 'prev'" />
                    </v-sheet>
                    <!-- </template> -->
                </v-stepper-window-item>
            </v-stepper-window>

            <v-stepper-window>
                <v-stepper-window-item value="2">
                    <!-- <template v-slot:item.2> -->
                    <h3 class="text-h6">Document info</h3>
                    <br />
                    <v-sheet>
                        <document-info @selection="info.document = $event" @success="disabled = false" />
                    </v-sheet>
                    <!-- </template> -->
                </v-stepper-window-item>
            </v-stepper-window>

            <v-stepper-window>
                <v-stepper-window-item value="3">
                    <!-- <template v-slot:item.3> -->
                    <h3 class="text-h6">Confirm</h3>
                    <br />
                    <v-sheet>
                        {{ info }}
                    </v-sheet>
                    <!-- </template> -->
                </v-stepper-window-item>
            </v-stepper-window>
            <v-stepper-actions :disabled="disabled" @click:next="next" @click:prev="prev">
                <template v-slot:next>
                    <v-btn v-if="step === 2" @click="submit" color="success">Submit</v-btn>
                    <v-btn v-else @click="next" color="primary">Next {{ step }}</v-btn>
                </template>
            </v-stepper-actions>
        </v-stepper>

        <v-spacer></v-spacer>
        <v-row class="mt-2">

        </v-row>
        <!-- <div class="d-flex justify-end mt-4">
            <submit-btn :checkedInfo="info" :loadingState="loading" @click="checkInfo" @submitted="clearForm()" />
        </div> -->
    </v-container>
</template>

<script setup>
import { reactive, ref } from "vue";

const loading = ref(false);
const info = reactive({
    user_name: {
        first_name: "",
        surname: "",
        middle: ""
    },
    document: {
        type: "",
        country: "",
        state: null,
        date: "",
        reminder_period: 'weekly',
        six_months: false
    }
});

// const isPassport = computed(() => info.type === 'Passport');

const clearForm = () => {
    Object.assign(info, {
        user_name: {
            first_name: "",
            surname: "",
            middle: ""
        },
        document: {
            type: "",
            country: "",
            state: null,
            date: "",
            reminder_period: 'weekly',
            six_months: false
        }
    });
};

const checkInfo = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        //clearForm();
    }, 2000);
};

const step = ref(0);
const submit = () => console.log("submited");
//const items = ref(['Holder Details', 'Document Details', 'Save']);
const disabled = ref(true)
const finished = ref(false)
const complete = reactive({
    first: () => step.value > 0,
    second: () => step.value > 1,
    third: () => step.value > 2
})

const disabledStat = () => {
    const stepNum = step.value;
    if (!finished.value) {
        disabled.value = stepNum === 1 ? true : 'next';
    } else {
        disabled.value = stepNum === 1 ? 'prev' : stepNum === 3 ? 'next' : false
    }
};
const next = () => step.value < 2 ? (step.value++ && disabledStat()) : "";
const prev = () => step.value >= 0 ? (step.value-- && disabledStat()) : "";

</script>


<style scoped>
/* Your styles here */
</style>