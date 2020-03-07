import api from '../../api'

const state = {
	ingredients: []
}

const getters = {
	ingredients(state) {
		return state.ingredients
	}
}

const actions = {
	getIngredients({ commit }) {
		api.ingredients.getIngredients().then(response => {
			commit('SET_INGREDIENTS', response.data)
		})
	}
}

const mutations = {
	SET_INGREDIENTS(state, ingredients) {
		state.ingredients = ingredients
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
