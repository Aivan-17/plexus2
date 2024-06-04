import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
console.log(import.meta.env)
const apiUrl = import.meta.env.VUE_APP_API_URL || "http://192.168.1.122:8080";
app.config.globalProperties.$apiUrl = apiUrl;

app.use(createPinia())
app.use(router)

app.mount('#app')
