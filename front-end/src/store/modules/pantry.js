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
	getPantryList({ commit }) {
		api.pantry.getPantry().then(response => {
			commit('SET_PANTRY', response.data)
		})
	}
}

const mutations = {
	SET_PANTRY(state, pantry) {
		state.pantry = pantry
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
