import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import './assets/main.css'

createApp(App).use(router).mount('#app')
app.use(router)
app.mount('#app')
