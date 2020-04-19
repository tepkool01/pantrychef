import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import NProgress from 'nprogress'; // For the progress bar at the top
import 'nprogress/nprogress.css';

// So all vue modules can use bootstrap and the bootstrap icons (CSS styling for the HTML pages)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// API Base URL
axios.defaults.baseURL = 'https://api.lepantrychef.com';
axios.defaults.crossDomain = true;

// Adding interceptors to show loading bar during HTTP requests
axios.interceptors.request.use(async (config) => {
	await store.dispatch('app/setLoading', true);
	// Start the progress bar
	NProgress.start();
	return config;
});

// Stops the loading bar once the request is resolved, resets loading state
axios.interceptors.response.use(async (response) => {
	await store.dispatch('app/setLoading', false);
	NProgress.done();
	return response;
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
