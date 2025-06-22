import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import vuetify from '@/utils/vuetify'

const app = createApp(App)
app.use(router).use(vuetify)
app.mount('#app')
