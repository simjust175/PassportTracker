<template>
  <div>
    <v-navigation-drawer v-model="drawer" theme="light" :rail="locationByScreen === 'left' ? rail : false" @click.stop="toggleRail" :location="locationByScreen" :permanent="locationByScreen == 'left'"
      :temporary="locationByScreen === 'bottom'">

      <v-btn :icon="chevronIcon" variant="text" @click.stop="toggleRail" v-if="locationByScreen === 'left'"></v-btn>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-list-box-outline" title="Form" value="form" @click="$router.push('/')"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar" title="Calendar" value="calendar" @click="$router.push('/calendar')"></v-list-item>
        <v-list-item prepend-icon="mdi-bell-outline" title="My reminders" value="reminders" @click="$router.push('/reminders')"></v-list-item>
        <v-list-item prepend-icon="mdi-cog-outline" title="Settings" value="currency"></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list-item prepend-icon="mdi-export" title="Logout" value="logout" class="bg-green"
          rounded="lg" @click="activateDialog = true"></v-list-item>
      </template>
    </v-navigation-drawer>
    <logout-dialog :activateDialog="activateDialog" title="Confirm Log-out" text="Are you sure?"  @cancel="activateDialog = false" v-bind="$attrs"/>
  </div>

</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

import { useDisplay } from 'vuetify'
const { name } = useDisplay()

const activateDialog = ref(false)
const emit = defineEmits(["updateLocale", "screenChange"]);
const props = defineProps({
  drawerOpen: Boolean
})

const activeItem = ref('')
const drawer = ref(true)
//const drawer = computed(()=> locationByScreen === 'left' ? true : false);
const rail = ref(true);
const chevronIcon = computed(() => rail.value ? `mdi-chevron-right` : `mdi-chevron-left`);

const toggleRail = () => {
  rail.value = !rail.value;
};

const locationByScreen = computed(() => {
  switch (name.value) {
    case 'xs':
      return 'bottom';
    case 'sm':
      return 'bottom';
    default:
      return 'left';
  }
});

watch(()=> props.drawerOpen, (newVal)=> drawer.value = newVal)
watch(locationByScreen, (newVal)=> emit("screenChange", newVal === 'bottom'))
onMounted(()=>{ 
  emit("screenChange", locationByScreen.value === 'bottom')
})
</script>

<style>
.mt-max {
  margin-top: 100px;
}
</style>
