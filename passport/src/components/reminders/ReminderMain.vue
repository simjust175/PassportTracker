<template>
  <v-container class="pa-8" fluid>
    <v-toolbar
      scroll-behavior="elevate inverted"
      class="bg-#000 mb-10 mr-10"
      height="50"
    >
      <v-spacer />
      <div class="d-flex align-center flex-column pa-6">
        <v-btn-group
          variant="outlined" 
          divided
          @click="banner = !banner"  
        >
          <v-btn icon="mdi-view-module" />
          <v-btn icon="mdi-view-sequential" />
        </v-btn-group>
      </div>
    </v-toolbar>

    <v-row>
      <v-col>
        <reminder-banner :documents="items" v-if="banner" />
        <reminder-card :documents="items" v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({ documents: Object });
const banner = ref(true);

// Sample data
const items = computed(() => props.documents);
</script>
