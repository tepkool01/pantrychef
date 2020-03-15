import api from '../../api'

const state = {
	pantry: []
}

const getters = {
	pantry(state) {
		return state.pantry
	}
}

const actions = {
	getPantryList({ commit }, profileId) {
		api.pantry.getPantry(profileId).then(response => {
			commit('SET_PANTRY', response.data)
		})
	},
	addIngredient({ commit }, ingredient_id, profile_id) {
		api.pantry.addIngredient().then(() => {
			commit('ADD_INGREDIENT', ingredient_id)
		})
	},
	removeIngredient({ commit }, ingredient_id, profile_id) {
		api.pantry.deleteIngredient().then(() => {
			commit('REMOVE_INGREDIENT', ingredient_id)
		})
	},
	getShoppingList({ commit }) {
		api.pantry.getShoppingList().then(response => {
			commit('SET_SHOPPING', response.data)
		})

		console.log('output')
		console.log(this.shopping)
	}
}

const mutations = {
	SET_PANTRY(state, pantry) {
		state.pantry = pantry
	},
	ADD_INGREDIENT(state, ingredient) {
		if (!state.pantry.includes(ingredient)) {
			state.pantry.push(ingredient)
		}
	},
	REMOVE_INGREDIENT(state, ingredient) {
		state.pantry.splice(state.pantry.indexOf(ingredient), 1)
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
