import api from '../../api'

const state = {
	profiles: []
}

const getters = {
	profiles(state) {
		return state.profiles
	}
}

const actions = {
	createProfile({ commit }, payload) {
		api.users.createProfile(payload).then(() => {
			commit('ADD_PROFILE', payload)
		})
	}
}

const mutations = {
	ADD_PROFILE(state, profile) {
		state.profiles.push(profile)
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
