import Vue from 'vue'
import Vuex from 'vuex'

import profile from './modules/profile'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		profile: {
			namespaced: true,
			state: profile.state,
			actions: profile.actions,
			getters: profile.getters,
			mutations: profile.mutations
		},
		users: {
			namespaced: true,
			state: users.state,
			actions: users.actions,
			getters: users.getters,
			mutations: users.mutations
		}
	}
})
