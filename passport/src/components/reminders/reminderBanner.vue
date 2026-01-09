<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="12">
        <v-card class="px-4" lines="one" width="100%" height="100">
          <div class="d-flex">
            <!-- <v-icon :icon="cardIcon(item.type)"></v-icon> -->
            <v-icon size="70" :icon="cardIcon(item.type)" />
            <p class="text-grey-lighten-2 text-caption">
              {{ item.type }}
            </p>
            <v-divider direction="vertical" color="transparent" />
            Expires{{ formatDate(item.date) }}
          </div>

          <div >
            <v-btn @click="editItem(item)"> 
              Edit 
            </v-btn>
            <v-btn @click="deleteItem(index)">
              Delete
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ documents: Object });

// Sample data
const items = computed(() => props.documents);
// Format date to a human-readable format
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const cardIcon = (type) =>
  type === "Passport" ? "mdi-passport" : "mdi-card-account-details-outline";

// Function to edit the item (just a placeholder for now)
const editItem = (item) => {
  console.log("Editing item", item);
  // Trigger an edit modal or navigate to an edit page
};

// Function to delete the item
const deleteItem = (index) => {
  items.value.splice(index, 1);
  console.log("Item deleted at index", index);
};

// Function to mark item as done (just a placeholder for now)
const markAsDone = (item) => {
  console.log("Item marked as done", item);
  // You can also implement a visual indicator, like a change in card color or a checkmark
};
</script>
