<template>
  <div>
  <v-navigation-drawer v-model="drawer" theme="light" :rail="rail" @click.stop="toggleRail" :permanent="true" :temporary="!rail">
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
const props = defineProps({ language: String })
const router = useRouter();

// import { useLocale } from 'vuetify'
// const { t } = useLocale()
const activateDialog = ref(false)
const emit = defineEmits(["updateLocale"]);
const emitLocale = (lang) => emit("updateLocale", lang);

const drawer = ref(true);
const rail = ref(true);
const chevronIcon = computed(() => `mdi-chevron-${props.language === 'he' ? 'right' : 'left'}`);

const toggleRail = () => {
  rail.value = !rail.value;
};

const titles = reactive({
  table: {
    he: "פרטים",
    en: "Table"
  },
  charts: {
    he: "הטבלאות שלי",
    en: "My tables"
  },
  currency: {
    he: "מטבע",
    en: "Currency"
  },
  percent: {
    he: "אחוזים",
    en: "Percentage"
  },
  location: {
    he: "מיקום",
    en: "Location"
  },
  receipts: {
    he: "קבלות",
    en: "Receipts"
  },
  logout: {
    he: "התנתקות",
    en: "logout"
  },

})

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
