import api from '../../api'

const state = {
	recipes: []
}

const getters = {
	recipes(state) {
		return state.recipes
	}
}

const actions = {
	getRecipes({ commit }) {
		api.recipe.getRecipes().then(response => {
			commit('SET_RECIPES', response.data)
		})
	}
}

const mutations = {
	SET_RECIPES(state, profiles) {
		state.profiles = profiles
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}