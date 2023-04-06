import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router.js'
import App from './App.vue'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia).mount('#app')
