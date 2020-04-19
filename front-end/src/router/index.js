/* Jest tag to ignore file for coverage */
/* istanbul ignore file */

import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewRecipe from "../components/modals/ViewRecipe";

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
		path: '/forgotPassword',
		name: 'forgotPassword',
		component: () => import('../views/ForgotPassword.vue')
	},
	{
		path: '/pantry',
		name: 'pantry',
		component: () => import('../views/Pantry.vue'),
		beforeEnter(to, from, next) {
			if (from.name !== 'home') {
				// Performed a login, don't do a getSession
				// Get session in case they refreshed the page
				store
					.dispatch('users/getSession')
					.then(() => {
						// todo: dry
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
			} else {
				next()
			}
		}
	},
	{
		path: '/recipes',
		name: 'recipes',
		component: () => import('../views/Recipes.vue'),
		children: [
			{
				path: ':id',
				name: "ViewRecipe",
				component: ViewRecipe
			},
		],
		beforeEnter(to, from, next) {
			store
				.dispatch('users/getSession')
				.then(() => {
					if (store.state.users.user.idToken != null) {
						store.dispatch('profile/getProfiles')
						next()
					} else {
						next('/')
					}
				})
				.catch(() => {
					next('/')
				})
		}
	},
	{
		path: '/settings',
		name: 'settings',
		component: () => import('../views/Settings.vue'),
		beforeEnter(to, from, next) {
			store
				.dispatch('users/getSession')
				.then(() => {
					if (store.state.users.user.idToken != null) {
						store.dispatch('profile/getProfiles')
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
