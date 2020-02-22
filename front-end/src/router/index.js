import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About.vue')
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../views/Register.vue')
	},
	{
		path: '/pantry',
		name: 'pantry',
		component: () => import('../views/Pantry.vue'),
		beforeEnter(to, from, next) {
			// Get session in case they refreshed the page
			store
				.dispatch('users/getSession')
				.then(() => {
					// If we can get a token, then they can proceed, otherwise redirect them to the sign-in page
					if (store.state.users.user.idToken != null) {
						next()
					} else {
						next('/')
					}
				})
				.catch(() => {
					next('/')
				})
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
