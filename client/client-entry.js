import 'es6-promise/auto'
import { app, store } from './app'
import "material-design-lite/material.min.css"
import "public/styles/main.css"

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.

// actually mount to DOM
app.$mount('#app')

// service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
