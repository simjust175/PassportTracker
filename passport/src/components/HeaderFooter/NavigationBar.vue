<template>
  <div>
  <v-navigation-drawer v-model="drawer" theme="light" :rail="rail" @click.stop="toggleRail" :temporary="rail ? false : true" :location="locationByScreen">
    <!-- <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="User name" nav> -->
      <!-- <template v-slot:append> -->
        <v-btn :icon="chevronIcon" variant="text" @click.stop="toggleRail"></v-btn>
      <!-- </template> -->
    <!-- </v-list-item> -->

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-calendar" title="Calendar" value="calendar"></v-list-item>
      <v-list-item prepend-icon="mdi-bell" title="My reminders" value="reminders"></v-list-item>
      <v-list-item prepend-icon="mdi-cog" title="Settings" value="currency"></v-list-item>
    </v-list>
    <template v-slot:append>
        <v-list-item prepend-icon="mdi-export" title="Logout" value="logout" class="bg-green mx-1 mb-1" rounded="lg"></v-list-item>
      </template>
  </v-navigation-drawer>
  <main-dialog :activateDialog="activateDialog" title="Confirm Log-out" text="confirm_dialog" @confirm="logout" />
</div>

</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

import { useDisplay } from 'vuetify'
const { name } = useDisplay()

const activateDialog = ref(false)
const emit = defineEmits(["updateLocale"]);
const emitLocale = (lang) => emit("updateLocale", lang);

const drawer = ref(true);
const rail = ref(true);
const chevronIcon = computed(() => `mdi-chevron-left`);

const toggleRail = () => {
  rail.value = !rail.value;
};

const locationByScreen = computed(() => {
    console.log(name.value)
  switch (name.value) {
    case 'xs':
      return 'bottom';
    case 'sm':
      return 'bottom';
    default:
      return 'left';
  }
});

const openExpandedTable = () => {
  router.push('/table');
  rail.value = false;
};

const currencyDropDownStat = ref(false);
</script>

<style>
.mt-max {
  margin-top: 100px;
}
</style>
