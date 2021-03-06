/* Jest tag to ignore file for coverage */
/* istanbul ignore file */

import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewRecipe from "../components/modals/ViewRecipe";

import store from '../store/index'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue'),
		beforeEnter(to, from, next) {
			store
				.dispatch('users/getSession')
				.then(() => {
					if (store.state.users.user.idToken != null) {
						next('/pantry')
					} else {
						next()
					}
				})
				.catch(() => {
					next()
				});
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/About.vue'),
		beforeEnter(to, from, next) {
			store
				.dispatch('users/getSession')
				.then(() => {
					if (store.state.users.user.idToken != null) {
						next('/pantry')
					} else {
						next()
					}
				})
				.catch(() => {
					next()
				});
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../views/Register.vue'),
		beforeEnter(to, from, next) {
			store
				.dispatch('users/getSession')
				.then(() => {
					if (store.state.users.user.idToken != null) {
						next('/pantry')
					} else {
						next()
					}
				})
				.catch(() => {
					next()
				});
		}
	},
	{
		path: '/forgotPassword',
		name: 'forgotPassword',
		component: () => import('../views/ForgotPassword.vue'),
		beforeEnter(to, from, next) {
			store
				.dispatch('users/getSession')
				.then(() => {
					if (store.state.users.user.idToken != null) {
						next('/pantry')
					} else {
						next()
					}
				})
				.catch(() => {
					next()
				});
		}
	},
	{
		path: '/pantry',
		name: 'pantry',
		component: () => import('../views/Pantry.vue'),
		children: [
			{
				path: ':id',
				name: "ViewRecipePantry",
				component: ViewRecipe
			},
		],
		beforeEnter(to, from, next) {
			if (from.name !== 'home') {
				// Performed a login, don't do a getSession
				// Get session in case they refreshed the page
				store
					.dispatch('users/getSession')
					.then(() => {
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
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router
