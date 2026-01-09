<template>
  <main>
    <v-card class="d-flex align-center justify-center ma-10 pa-8">
      <calendar-main :documents="docs.dbResponse" />
    </v-card>
  </main>
</template>

<script setup>
import { documents } from "@/stores/documentState";
const docs = documents();
console.log("lolololololo", docs);

</script>
