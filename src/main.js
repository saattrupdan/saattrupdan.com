import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router.js'
import { vClickOutside } from '@/directives.js'
import App from '@/App.vue'
import '@/assets/main.css'

// Create Vue app
const app = createApp(App)

// Add plugins to app
app.use(createPinia())
app.use(router)

// Add directives to app
app.directive('click-outside', vClickOutside)

// Mount app to the element with id 'app'
app.mount('#app')
