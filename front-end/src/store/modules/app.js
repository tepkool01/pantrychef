const state = {
	loading: false,
};

const getters = {
	currentLoadingStatus(state) {
		return state.loading;
	},
};

const actions = {
	setLoading({ commit }, status) {
		commit('SET_LOADING_STATUS', status);
	},
};

const mutations = {
	SET_LOADING_STATUS(state, status) {
		state.loading = status;
	},
};

export default {
	state,
	actions,
	mutations,
	getters
}
