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
		api.profile.createProfile(payload).then(response => {
			commit('ADD_PROFILE', response.data)
		})
	},
	getProfiles({ commit }) {
		api.profile.getProfiles().then(response => {
			commit('SET_PROFILES', response.data)
		})
	},
	deleteProfile({ commit }, id) {
		api.profile.deleteProfile().then(() => {
			commit('DELETE_PROFILE', id)
		})
	}
}

const mutations = {
	ADD_PROFILE(state, profile) {
		console.log("Adding profile", profile)
		state.profiles.push(profile)
	},
	SET_PROFILES(state, profiles) {
		state.profiles = profiles
	},
	DELETE_PROFILE(state, id) {
		let profiles = state.profiles
		for (let i = 0, len = profiles.length; i < len; i++) {
			if (profiles[i].id === id) {
				profiles.splice(i, 1)
				break
			}
		}
		state.profiles = profiles
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
