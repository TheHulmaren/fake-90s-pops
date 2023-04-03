import { createApp } from 'vue'
import App from './App.vue'

import './css/output.css'

import router from './router'

createApp(App).use(router).mount('#app')
