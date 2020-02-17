import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './custom.scss'

// So all vue modules can use bootstrap and the bootstrap icons (CSS styling for the HTML pages)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// API Base URL
axios.defaults.baseURL = 'https://api.lepantrychef.com'
axios.defaults.crossDomain = true

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
