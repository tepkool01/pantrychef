import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

// API Base URL
axios.defaults.baseURL = 'https://api.lepantrychef.com';
axios.defaults.crossDomain = true;

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
