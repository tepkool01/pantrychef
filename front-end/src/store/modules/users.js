import api from '../../api'

const state = {
	isAuthenticated: false
}

const getters = {
	isAuthenticated(state){
		return state.isAuthenticated
	}
}

const actions = {
	login({ commit },payload) {
		console.log(payload)
		api.login.authenticate(payload.username, payload.password).then(() => {
			commit('AUTHENICATE', payload)
		})
	}
}

const mutations = {
	AUTHENICATE(state) {
		console.log('User Auth - Succeeded!')
		state.isAuthenticated = true
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}