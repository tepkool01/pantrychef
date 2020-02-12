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
	},
	getProfiles({ commit }) {
		api.users.getProfiles().then(response => {
			commit('SET_PROFILES', response)
		})
	}
}

const mutations = {
	ADD_PROFILE(state, profile) {
		state.profiles.push(profile)
	},
	SET_PROFILES(state, profiles) {
		state.profiles = profiles
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
