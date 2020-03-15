import api from '../../api'

const state = {
	pantry: [],
	shopping: []
}

const getters = {
	pantry(state) {
		return state.pantry
	},
	shopping(state) {
		return state.shopping
	}
}

const actions = {
	getPantryList({ commit }) {
		api.pantry.getPantry().then(response => {
			commit('SET_PANTRY', response.data)
		})
	},
	getShoppingList({ commit }) {

		api.pantry.getShoppingList().then(response => {
			commit('SET_SHOPPING', response.data)
		})
		
		console.log("output")
		console.log(this.shopping)
	}
}

const mutations = {
	SET_PANTRY(state, pantry) {
		state.pantry = pantry
	},
	SET_SHOPPING(state, shopping) {
		state.shopping = shopping
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
