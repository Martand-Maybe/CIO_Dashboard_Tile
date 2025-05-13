import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)
app.use(router)
app.use(
  createAuth0({
    domain: 'dev-3ws8zmasuss5mpci.jp.auth0.com',
    clientId: 'pvaDObo31i2NznysZMtbsz0V9zTRzgWR',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)
app.mount('#app')
