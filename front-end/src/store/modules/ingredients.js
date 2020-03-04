import api from '../../api'

const state = {
	ingredients: []
}

const getters = {
	profiles(state) {
		return state.ingredients
	}
}

const actions = {
	getIngredients({ commit }) {
		api.ingredients.getIngredients().then(response => {
			commit('SET_PROFILES', response.data)
		})
	}
}

const mutations = {

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
