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
		api.shoppinglist.getShoppingList().then(response => {
			commit('SET_SHOPPING', response.data)
		})

		console.log('output')
		console.log(this.shopping)
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
