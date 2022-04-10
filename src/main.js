import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vue3TreeOrg from 'vue3-tree-org'
import 'vue3-tree-org/lib/vue3-tree-org.css'

import http from '@/api/config'
import './mock'

const app = createApp(App)
app.config.globalProperties.$http = http
app.use(store).use(router).use(vue3TreeOrg).mount('#app')
