import api from '../../api'

const state = {
	isAuthenticated: false,
	username: '',
	user: {
		accessToken: '',
		idToken: '',
		refreshToken: '',
		userId: '',
		cognitoUser: null,
	},
	mealPreference: {},
	availableMealPreferences: []
}

const getters = {
	availableMealPreferences(state) {
		return state.availableMealPreferences
	},
	userMealPreference(state) {
		return state.mealPreference
	},
	isAuthenticated(state) {
		return state.isAuthenticated
	},
	user(state) {
		return state.user
	},
	userId(state) {
		if (state.user.hasOwnProperty('userId')) {
			return state.user.userId
		} else {
			return ''
		}
	},
	idToken(state) {
		if (state.user.hasOwnProperty('idToken')) {
			return state.user.idToken;
		} else {
			return '';
		}
	},
};

const actions = {
	getUserInfo({commit}) {
		api.users.getUserInfo().then(result => {
			commit("SET_MEAL_PREFERENCE", result['data']['meal_preference']);
			commit('SET_AVAILABLE_MEAL_PREFERENCES', result['data']['available_meal_preferences']);
		});
	},
	async updateUserInfo({ commit }, payload) {
		try {
			await api.users.updateUser(payload);
			commit("SET_MEAL_PREFERENCE", payload.meal_preference);
		} catch (e) {
			console.error(e);
		}
	},
	login({ commit }, payload) {
		return new Promise((resolve, reject) => {
			api.users.authenticate(payload.username, payload.password)
				.then(result => {
					commit('AUTHENTICATE', result);
					resolve(true);
				})
				.catch(err => {
					reject(err);
				})
		})
	},

	getSession({ commit }) {
		return new Promise((resolve, reject) => {
			api.users.getUserSession()
				.then(response => {
					commit('AUTHENTICATE', response);
					resolve(response)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	forgotPassword({ commit }, payload) {
		return new Promise((resolve, reject) => {
			api.users
				.forgotPassword(payload.username)
				.then(response => {
					commit('FORGOTPASSWORD', payload.username)
					resolve(response)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	forgotPasswordVerification({ commit }, payload) {
		console.log(state.username)
		return new Promise((resolve, reject) => {
			api.users
				.forgotPasswordVerification(state.username, payload.code, payload.newPassword)
				.then(response => {
					commit('FORGOTPASSWORDVERIFICATION', response)
					resolve(response)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	createAccount({ commit }, payload) {
		return new Promise((resolve, reject) => {
			api.users
				.register(payload.username, payload.password, payload.email)
				.then(response => {
					commit('REGISTER', response)
					resolve(true)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	logout({ commit, state }) {
		if (state.user.cognitoUser) {
			state.user.cognitoUser.signOut();
			commit('LOGOUT');
		}
	},
	UpdatePassword({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			api.users
				.updatePassword(state.user.cognitoUser, payload.newPassword, payload.oldPassword)
				.then(() => {
					resolve(true)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}

const mutations = {
	SET_AVAILABLE_MEAL_PREFERENCES(state, availableMealPreferences) {
		state.availableMealPreferences = availableMealPreferences
	},
	SET_MEAL_PREFERENCE(state, mealPreference) {
		state.mealPreference = mealPreference
	},
	AUTHENTICATE(state, returnedUser) {
		if (returnedUser != null) {
			state.isAuthenticated = true;
			state.user = returnedUser;
		}
	},
	REGISTER(state, returnedUser) {
		// eslint-disable-next-line no-console
		console.log('New User Registered!')
		state.user = returnedUser
	},
	LOGOUT(state) {
		state.user.accessToken = '';
		state.user.idToken = '';
		state.user.refreshToken = '';
		state.user.userId = '';
		state.user.cognitoUser = null;
		state.isAuthenticated = false;
	},
	// eslint-disable-next-line no-unused-vars
	CHANGEPASSWORD(state) {
		// eslint-disable-next-line no-console
		console.log('Users password is updated!')
		//TODO: Update User?
	},
	FORGOTPASSWORD(state, username) {
		// eslint-disable-next-line no-console
		console.log('FORGOTPASSWORD: Users password is updated...' + username)
		state.username = username
	},
	UPDATEPASSWORD(state, username) {
		// eslint-disable-next-line no-console
		console.log('UPDATEPASSWORD: Users password is updated...' + username)
		state.username = username
	},
	// eslint-disable-next-line no-unused-vars
	FORGOTPASSWORDVERIFICATION(state) {
		// eslint-disable-next-line no-console
		console.log('FORGOTPASSWORD: Users password is updated...')
		//TODO: Update User?
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
