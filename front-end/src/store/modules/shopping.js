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
		api.pantry.getShopping().then(response => {
			commit('SET_SHOPPING', response.data)
		})
	}
}

const mutations = {
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
