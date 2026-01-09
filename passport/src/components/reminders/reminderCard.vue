<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="12" md="4" sm="6">
        <v-card class="mx-auto my-4" width="300" elevation="10" height="150">
          <!-- Card Header -->
          <v-card-title class="d-flex align-center justify-space-between bg-primary text-white px-4 py-3">
            <div class="d-flex align-center">
              <v-icon class="mr-2"> {{ cardIcon(item.type) }} </v-icon>
              <span class="text-h6 font-weight-bold"> {{ item.type }} </span>
            </div>
            <v-btn icon @click="markAsDone(item)">
              <v-icon color="primary">
                mdi-check-outline
              </v-icon>
            </v-btn>
          </v-card-title>

          <!-- User Name -->
          <v-card-subtitle class="text-center text-primary text-body-1 font-weight-medium py-2">
            {{ item.user_name }}
          </v-card-subtitle>

          <!-- Card Content -->
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Country:</strong> {{ item.country }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.state }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Date:</strong> {{ formatDate(item.date) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Reminder Period:</strong> {{ item.reminder_period }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <strong>Six Months:</strong> {{ item.six_months ? "Yes" : "No" }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Email Reminder:</strong> {{ item.reminder_email || "None" }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>

          <!-- Actions -->
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-space-between px-4">
            <v-btn @click="editItem(item)" color="primary" variant="flat">
              <v-icon start>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn @click="deleteItem(index)" color="red" variant="flat">
              <v-icon start>
                mdi-delete
              </v-icon> 
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ documents: Object });
const items = computed(() => props.documents);

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const cardIcon = (type) => (type === "Passport" ? "mdi-passport" : "mdi-card-account-details-outline");

const editItem = (item) => console.log("Editing item", item);
const deleteItem = (index) => {
  items.value.splice(index, 1);
  console.log("Item deleted at index", index);
};

const markAsDone = (item) => {
  console.log("Item marked as done", item);
};
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

.v-card-title {
  font-weight: bold;
}

.v-btn {
  text-transform: none;
}

.v-list-item-title {
  font-size: 14px;
}

.v-list-item-subtitle {
  font-size: 12px;
  color: gray;
}
</style>

