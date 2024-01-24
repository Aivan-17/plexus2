import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
console.log(import.meta.env)
const apiUrl = import.meta.env.VUE_APP_API_URL || "https://prueba-plexus-backend.serverbb.online";
app.config.globalProperties.$apiUrl = apiUrl;

app.use(createPinia())
app.use(router)

app.mount('#app')
