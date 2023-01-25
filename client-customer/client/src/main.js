import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueAwesomePaginate from "vue-awesome-paginate";

import './assets/style.css'
import vue3GoogleLogin from 'vue3-google-login'
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
});
app.use(pinia)
app.use(VueAwesomePaginate)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '1090158765200-4sii9ouqjildbus9jvqqjqq9plaet63l.apps.googleusercontent.com'
})

app.mount('#app')
