<template>
<v-container fluid>
    <v-row>
        <v-col>
            <v-card class="px-4 py-2"
            prepend-icon="mdi-passport"
            title="lets see this" subtitle="will it work" elevated="4" variant="tonal">
            <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        text="Explore"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup>
import { ref} from "vue"
const show = ref(false)


</script>