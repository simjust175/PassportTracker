<template v-slot:default="{ prev, next }">
    <v-container min-width="800" fluid>
        <v-stepper v-model="step" alt-labels>
            <v-stepper-header class="overflow-hidden">

                <v-divider :thickness="5" class="border-opacity-50" :color="dividerColorFirst"></v-divider>

                <v-stepper-item value="1" class="enlarged-item" style="width: 40px; height: 40px" :complete="complete.first" :color="dividerColorFirst" icon="mdi-account">
                    <template v-slot:title>Holder info</template>
                </v-stepper-item>

                <v-divider :thickness="5" class="border-opacity-50" :color="dividerColorSecond"></v-divider>

                <v-stepper-item value="2" :complete="complete.second" :color="dividerColorSecond" icon="mdi-passport">
                    <template v-slot:title>Document info</template>
                </v-stepper-item>

                <v-divider :thickness="5" class="border-opacity-75" :color="dividerColorThird"></v-divider>

                <v-stepper-item value="3" :complete="complete.third" :color="dividerColorThird"
                    icon="mdi-content-save-outline">
                    <template v-slot:title>Save</template>
                </v-stepper-item>

                <v-divider :thickness="5" class="border-opacity-75" :color="dividerColorThird"></v-divider>

            </v-stepper-header>

            <!-- Step 1 - Holder Info -->
            <v-stepper-window>
                <v-stepper-window-item value="1">
                    <h3 class="text-h6">Holder info</h3>
                    <v-sheet class="d-flex justify-center">
                        <holder-info @selection="info.user_name = $event" @success="markStepAsComplete(1)" />
                    </v-sheet>
                </v-stepper-window-item>
            </v-stepper-window>

            <!-- Step 2 - Document Info -->
            <v-stepper-window>
                <v-stepper-window-item value="2">
                    <h3 class="text-h6">Document info</h3>
                    <br />
                    <v-sheet>
                        <document-info @selection="info.document = $event" @success="markStepAsComplete(2)" />
                    </v-sheet>
                </v-stepper-window-item>
            </v-stepper-window>

            <!-- Step 3 - Confirm -->
            <v-stepper-window>
                <v-stepper-window-item value="3">
                    <h3 class="text-h6">Confirm</h3>
                    <br />
                    <v-sheet>
                        <final-details :info="info" @confirmed="checkedInfo = $event" />
                    </v-sheet>
                </v-stepper-window-item>
            </v-stepper-window>

            <v-stepper-actions :disabled="disabled" @click:prev="prev">
                <template v-slot:next>
                    <submit-btn v-if="step === 2" :checkedInfo="checkedInfo" :loadingState="loading" @click="checkInfo"/>
                    <v-btn v-else @click="next" color="primary" variant="flat">Next</v-btn>
                </template>
            </v-stepper-actions>
        </v-stepper>
    </v-container>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

// Initial data and state
const checkedInfo = ref({})
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

// Step tracking
const step = ref(0);
const complete = reactive({
    first: false,
    second: false,
    third: false
});
const dividerColorFirst = computed(() => step.value >= 0 ? 'success' : '')
const dividerColorSecond = computed(() => step.value >= 1 ? 'success' : '')
const dividerColorThird = computed(() => step.value >= 2 ? 'success' : '')
const disabled = ref(true); // Initially disable the both buttons
const finished = ref(false)

const checkInfo = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        //clearForm();
    }, 2000);
};

// Mark a step as complete once the required data is entered
const markStepAsComplete = (stepNumber) => {
    if (stepNumber === 1) {
        complete.first = true;
    } else if (stepNumber === 2) {
        complete.second = true;
    } else if (stepNumber === 3) {
        complete.third = true;
    }
    disabledStat(step.value); // Recheck button status when marking a step complete
};

const stepNum = computed(() => step.value)
const disabledStat = (num) => {
    const currentStep = stepNum.value
    if (currentStep === 1) {
        disabled.value = !complete.second ? 'next' : false
    } else if (currentStep === 2) {
        disabled.value = false
    } else {
        disabled.value = !complete.first ? true : 'prev';
    }
};
const next = () => {
    if (step.value <= 2) {
        step.value++
        disabledStat(step.value)
    }
}
const prev = () => {
    if (step.value >= 0) {
        step.value--
        disabledStat(step.value)
    }
}


// Reset form data
const clearForm = () => {
    Object.assign(info, {
        user_name: { first_name: "", surname: "", middle: "" },
        document: { type: "", country: "", state: null, date: "", reminder_period: 'weekly', six_months: false }
    });
};

// Initialize form validation
//   checkButtonStatus();
</script>

<style>

.v-stepper__step__step {
     width: 40px;
   height: 40px;
}
/* Add smooth cv-avatar v-theme--light bg-success v-avatar--density-default v-avatar--variant-flat v-stepper-item__avatar
    background-color: #4caf50 !important;
    transition: background-color 0.3s ease;
}

/* Completed icon color */
.completed .v-icon {
    color: #4caf50 !important;
}

/* Icon inside step */
.v-stepper-item .v-stepper__step .v-icon {
    font-size: 24px;
    transition: color 0.3s ease;
}

/* Optional: Add a nice hover effect on stepper items */
.v-stepper-item:hover {
    cursor: pointer;
}

.v-stepper-item:hover .v-icon {
    color: #1976d2;
}
</style>

<!-- <script setup>
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

</script> -->
