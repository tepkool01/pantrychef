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
	addIngredient({ commit }, payload) {
		api.pantry.addIngredient(payload.ingredient.id, payload.profile_id).then(() => {
			commit('ADD_INGREDIENT', payload.ingredient)
		})
	},
	removeIngredient({ commit }, payload) {
		api.pantry.deleteIngredient(payload.ingredient.id, payload.profile_id).then(() => {
			commit('REMOVE_INGREDIENT', payload.ingredient)
		})
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
