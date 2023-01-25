import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '1090158765200-4sii9ouqjildbus9jvqqjqq9plaet63l.apps.googleusercontent.com'
})

app.mount('#app')
