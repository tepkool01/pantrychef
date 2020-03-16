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
	},
	getRecipeIngredients({ commit }, recipe_id) {
		return api.recipe.getIngredients(recipe_id)
	}
}

const mutations = {
	SET_RECIPES(state, recipes) {
		state.recipes = recipes
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
