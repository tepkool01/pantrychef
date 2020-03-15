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
	getShoppingList({ commit }) {
        console.log('output')
		api.shoppinglist.getShoppingList().then(response => {
			commit('SET_SHOPPING', response.data)
		})
	},
	addIngredient({ commit }, ingredient_id, profile_id) {
		console.log("Adding ingredient", ingredient_id)
		api.shoppinglist.addIngredient(profile_id, ingredient_id).then(() => {
			commit('ADD_INGREDIENT', ingredient_id)
		})
	},
	removeIngredient({ commit }, ingredient_id, profile_id) {
		console.log("Removing ingredient", ingredient_id)
		api.shoppinglist.deleteIngredient(profile_id, ingredient_id).then(() => {
			commit('REMOVE_INGREDIENT', ingredient_id)
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
