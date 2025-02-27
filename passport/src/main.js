/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import store from "./Storage"
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"



// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)

pinia.use(piniaPluginPersistedState)

app.use(store)
app.use(pinia)
app.mount('#app')
