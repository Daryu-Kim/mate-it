import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMobileDetection from 'vue-mobile-detection'

createApp(App).use(store).use(router).use(VueMobileDetection).mount('#app')
