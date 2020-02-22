import api from '../../api'
//import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

const state = {
	isAuthenticated: false,
	user: null
}

const getters = {
	isAuthenticated(state) {
		return state.isAuthenticated
	},
	user(state) {
		return state.user
	},
	userId(state) {
		if (state.user.hasOwnProperty('userId')) {
			return state.user.userId
		} else {
			return ''
		}
	},
	idToken(state) {
		if (state.user.hasOwnProperty('idToken')) {
			return state.user.idToken
		} else {
			return null
		}
	}
}

const actions = {
	login({ commit }, payload) {
		return new Promise((resolve, reject) => {
			api.users
				.authenticate(payload.username, payload.password)
				.then(result => {
					commit('AUTHENTICATE', result)
					resolve(true)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	getSession({ commit }) {
		return new Promise((resolve, reject) => {
			api.users
				.getUserSession()
				.then(response => {
					commit('AUTHENTICATE', response)
					resolve(response)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	createAccount({ commit }, payload) {
		return new Promise((resolve, reject) => {
			api.users
				.register(payload.username, payload.password, payload.email)
				.then(response => {
					commit('REGISTER', response)
					resolve(true)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	logout({ commit }) {
		api.users.logout()
		commit('LOGOUT')
	},
	UpdatePassword({ commit }) {
		api.users.updatePassword(state.user).then(() => {
			commit('CHANGEPASSWORD')
		})
	}
}

const mutations = {
	AUTHENTICATE(state, returnedUser) {
		// eslint-disable-next-line no-console
		console.log('User Authentication - Succeeded!')
		console.log(returnedUser)
		if (returnedUser != null) {
			state.isAuthenticated = true
			state.user = returnedUser
		}
	},
	REGISTER(state, returnedUser) {
		// eslint-disable-next-line no-console
		console.log('New User Registered!')
		state.isAuthenticated = true
		state.user = returnedUser
	},
	LOGOUT(state) {
		// eslint-disable-next-line no-console
		console.log('User has been logged out!')
		state.user = null
		state.isAuthenticated = false
	},
	// eslint-disable-next-line no-unused-vars
	CHANGEPASSWORD(state) {
		// eslint-disable-next-line no-console
		console.log('Users password is updated!')
		//TODO: Update User?
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
