<template>
    <v-sheet class="pa-4" elevation="2" rounded>
        <v-simple-table>
            <tbody id="tbody">
                <tr v-for="(value, key) in userInfo" :key="key" class="border-b-lg">
                    <td v-if="value" class="d-flex justify-space-between">
                        <div>
                            <span class="text-subtitle-1 font-weight-medium">{{ enhanceText(key) }}</span>
                            <p class="text-body-1">{{ value }}</p>
                        </div>
                        <v-icon
                            @click="editItem(key)"
                            color="primary"
                            class="cursor-pointer"
                            style="font-size: 24px; transition: transform 0.2s ease-in-out;"
                            @mouseover="hoverIcon = true"
                            @mouseleave="hoverIcon = false"
                            :style="{ transform: hoverIcon ? 'scale(1.1)' : 'scale(1)' }"
                        >
                            mdi-pencil
                        </v-icon>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-sheet>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    info: Object,
});

const emit = defineEmits(["confirmed", "edit"]);

const userInfo = ref({});
const hoverIcon = ref(false);

const enhanceText = (txt) => {
    if (txt.includes("_")) {
        txt = txt.replace("_", " ");
    }
    return txt.charAt(0).toUpperCase() + txt.slice(1);
};

watch(
    () => props.info,
    ({ user_name, document }) => {
        let { date } = document;
        date = new Date(date).toISOString().split('T')[0]; // Fix date format
        document.date = date;
        userInfo.value = { ...user_name, ...document };
        console.log("Confirmed", userInfo.value);
        emit("confirmed", userInfo.value);
    },
    { immediate: true }
);

const stepByKey = (key) => {
    switch (key) {
        case 'surname':
          case  'middle':
          case  'first_name':
            return 0;   
        default:
            return 1;
    }
}
const editItem = (key) => {
    emit('edit', stepByKey(key));
};
</script>

<style scoped>
.v-sheet {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

/* Row and column structure */
tbody#tbody {
    width: 100%;
    display: table;
}

tr {
    border-bottom: 1px solid #E0E0E0;
    transition: background-color 0.3s ease;
}

/* Row hover effect */
tr:hover {
    background-color: #f5f5f5;
}

/* Text styling */
.text-subtitle-1 {
    color: #333;
    font-size: 16px;
}

.text-body-1 {
    color: #555;
    font-size: 14px;
    margin: 0;
}

/* Padding and layout of each cell */
td {
    padding: 12px 16px;
    vertical-align: middle;
}

/* Icon styling */
.v-icon {
    cursor: pointer;
    font-size: 24px;
    transition: transform 0.2s ease-in-out;
}

/* Icon hover effect */
.v-icon:hover {
    transform: scale(1.1);
}
</style>
