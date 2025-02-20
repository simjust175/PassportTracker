<template v-slot:default="{ prev, next }">
  <v-card min-width="800" class="rounded-lg" elevation="4" fluid>
    <v-stepper v-model="step" elevation="0" alt-labels>
      <div class="pt-9 text d-flex flex-column align-center">
        <h2>Add Your Document</h2>
        <h4 class="text-grey-darken-1">Please Enter Your Information</h4>
      </div>
      <v-stepper-header class="shadow-none overflow-hidden py-5" elevation="0">

        <v-divider :thickness="10" class="border-opacity-50 mt-10" inset :color="dividerColorFirst"></v-divider>

        <v-stepper-item size="large" value="1" class="enlarged-item" style="width: 40px; height: 40px"
          :complete="complete.first" :color="dividerColorFirst" icon="mdi-account">
          <template v-slot:title>Holder Information</template>
        </v-stepper-item>

        <v-divider :thickness="10" class="border-opacity-50 mt-10" :color="dividerColorSecond"></v-divider>

        <v-stepper-item value="2" :complete="complete.second" :color="dividerColorSecond" icon="mdi-passport">
          <template v-slot:title>Document Information</template>
        </v-stepper-item>

        <v-divider :thickness="10" class="border-opacity-50 mt-10" :color="dividerColorThird"></v-divider>

        <v-stepper-item value="3" :complete="complete.third" :color="dividerColorThird" icon="mdi-content-save-outline">
          <template v-slot:title>Save</template>
        </v-stepper-item>

        <v-divider :thickness="10" class="border-opacity-50 mt-10" :color="dividerColorThird"></v-divider>

      </v-stepper-header>

      <div class="px-10">
        <!-- Step 1 - Holder Information -->
        <v-stepper-window>
          <v-stepper-window-item value="1">
            <!-- <h3 class="text-h6">Holder Information</h3> -->
            <v-sheet class="d-flex justify-center pt-3">
              <holder-info @selection="info.user_name = $event" @success="markStepAsComplete(1)" />
            </v-sheet>
          </v-stepper-window-item>
        </v-stepper-window>

        <!-- Step 2 - Document Information -->
        <v-stepper-window>
          <v-stepper-window-item value="2">
            <h3 class="text-h6">Document Information</h3>
            <br />
            <v-sheet>
              <document-info @selection="info.document = $event" @success="markStepAsComplete(2)" />
            </v-sheet>
          </v-stepper-window-item>
        </v-stepper-window>

        <!-- Step 3 - Confirmation -->
        <v-stepper-window>
          <v-stepper-window-item value="3">
            <h3 class="text-h6">Confirmation</h3>
            <br />
            <v-sheet>
              <final-details :info="info" @confirmed="checkedInfo = $event" />
            </v-sheet>
          </v-stepper-window-item>
        </v-stepper-window>

        <v-stepper-actions :disabled="disabled" @click:prev="prev">
          <template v-slot:next>
            <submit-btn v-if="step === 2" :checkedInfo="checkedInfo" :loadingState="loading" @click="checkInfo" />
            <v-btn v-else @click="next" color="success" variant="flat" append-icon="mdi-arrow-right-bold-outline">Next</v-btn>
          </template>
        </v-stepper-actions>
      </div>
    </v-stepper>

  </v-card>
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

</script>

<style>
div.v-avatar {
  width: 40px !important;
  height: 40px !important;
}

i {
  font-size: 22px !important;
}

.shadow-none {
  box-shadow: none !important;
}

.v-stepper-header{
  box-shadow: none !important;
}

/* Completed icon color */
.completed .v-icon {
  color: #4caf50 !important;
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
