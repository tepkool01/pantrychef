import api from '../../api'

const state = {
	profiles: [],
	active_profile: null
}

const getters = {
	profiles(state) {
		return state.profiles
	},
	activeProfile(state) {
		console.log("Returning active profile", state.active_profile)
		return state.active_profile
	}
}

const actions = {
	createProfile({ commit }, payload) {
		api.profile.createProfile(payload).then(response => {
			commit('ADD_PROFILE', response.data)
		})
	},
	activateProfile({ commit }, payload) {
		commit('SET_ACTIVE', payload)
		//api.profile.createProfile(payload).then(response => {

		//})
	},
	getProfiles({ commit }) {
		console.log("Getting profiles")
		api.profile.getProfiles().then(response => {
			commit('SET_PROFILES', response.data)
		})
	},
	deleteProfile({ commit }, id) {
		api.profile.deleteProfile(id).then(() => {
			commit('DELETE_PROFILE', id)
		})
	}
}

const mutations = {
	SET_ACTIVE(state, profile) {
		state.active_profile = profile
	},
	ADD_PROFILE(state, profile) {
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
