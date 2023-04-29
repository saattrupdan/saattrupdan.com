import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/js/router.js'
import { vClickOutside } from '@/js/directives.js'
import App from '@/App.vue'

// Create Vue app
const app = createApp(App)

// Add plugins to app
app.use(createPinia())
app.use(router)

// Add directives to app
app.directive('click-outside', vClickOutside)

// Mount app to the element with id 'app'
app.mount('#app')
