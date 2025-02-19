<template>
    <v-sheet class="pa-4" elevation="2" rounded>
        <v-simple-table>
            <tbody>
                <tr v-for="(value, key) in userInfo" :key="key">
                    <div class="d-flex justify-space-between" min-width="1200"  v-if="value">
                        <td class="text-subtitle-1 font-weight-medium">{{ enhanceText(key) }}</td>
                        <td class="text-body-1">{{ value }}</td>
                        <td>
                            <v-icon @click="editItem(key)" color="primary" class="cursor-pointer"
                                style="font-size: 24px">
                                mdi-pencil
                            </v-icon>
                        </td>
                    </div>
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

const emit = defineEmits(["confirmed"])

const userInfo = ref({});

const enhanceText = (txt) => {
    if (txt.includes("_")){ txt= txt.replace("_", " ")}
    return txt.charAt(0).toUpperCase() + txt.slice(1, txt.length)
}

watch(
    () => props.info,
    ({ user_name, document }) => {
        let { date } = document;
        date = new Date(date).toISOString().split('T')[0];
        document.date = date; // Fixing the date format
        userInfo.value = { ...user_name, ...document };
        console.log("confirmrd", userInfo.value);
        emit("confirmed", userInfo.value)
    },
    { immediate: true }
);

const editItem = (key) => {
    console.log(`Editing item: ${key}`);
    // Add your edit logic here (e.g., emit an event, open a dialog)
};
</script>

<style scoped>
/* Style for the sheet container */
.pa-4 {
    padding: 20px;
}

/* Add subtle borders and shadow to give a card-like feel */
.v-sheet {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header styling for the table */
th {
    font-weight: bold;
    text-align: left;
    color: #555;
}

/* Row styling */
td {
    padding: 12px;
    border-bottom: 1px solid #f1f1f1;
    vertical-align: middle;
}

/* Text color and font size adjustments */
.text-subtitle-1 {
    color: #333;
    font-size: 16px;
}

.text-body-1 {
    color: #555;
    font-size: 14px;
}

/* Icon styling with hover effect */
.v-icon {
    transition: transform 0.2s ease-in-out;
}

.v-icon:hover {
    transform: scale(1.1);
}

/* Add hover effect for rows */
tr:hover {
    background-color: #f9f9f9;
}
</style>



<style></style>