import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ScrollPicker from 'vue3-scroll-picker';

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ScrollPicker)
app.mount('#app')
