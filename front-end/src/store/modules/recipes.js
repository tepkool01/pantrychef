import api from '../../api'

const state = {
	recipes: []
};

const getters = {
	recipes(state) {
		return state.recipes
	}
};

const actions = {
	getRecipes({ commit }, payload) {
		api.recipe.getRecipes(payload).then(response => {
			commit('SET_RECIPES', {
				data: response.data,
				offset: payload.offset > 0,
			})
		})
	},
	getRecipeIngredients({ commit }, recipe_id) {
		return api.recipe.getIngredients(recipe_id)
	}
};

const mutations = {
	SET_RECIPES(state, recipes) {
		if (recipes.offset) {
			state.recipes = state.recipes.concat(recipes.data);
		} else {
			state.recipes = recipes.data;
		}
	}
};

export default {
	state,
	actions,
	mutations,
	getters
}
