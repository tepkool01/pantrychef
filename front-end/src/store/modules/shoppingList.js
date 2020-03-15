import api from '../../api'

const state = {
	shopping: []
}

const getters = {
	shopping(state) {
		return state.shopping
	}
}

const actions = {
	getShoppingList({ commit }, profileId) {
		api.shoppinglist.getShoppingList(profileId).then(response => {
			commit('SET_SHOPPING', response.data)
		})
	},
	addIngredient({ commit }, payload) {
		api.shoppinglist.addIngredient(payload.ingredient.id, payload.profile_id).then(() => {
			commit('ADD_INGREDIENT', payload.ingredient)
		})
	},
	removeIngredient({ commit }, payload) {
		api.shoppinglist.deleteIngredient(payload.ingredient.id, payload.profile_id).then(() => {
			commit('REMOVE_INGREDIENT', payload.ingredient)
		})
	}
}

const mutations = {
	SET_SHOPPING(state, shopping) {
		state.shopping = shopping
	},
	ADD_INGREDIENT(state, ingredient) {
		if (!state.shopping.includes(ingredient)) {
			state.shopping.push(ingredient)
		}
	},
	REMOVE_INGREDIENT(state, ingredient) {
		state.shopping.splice(state.shopping.indexOf(ingredient), 1)
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
