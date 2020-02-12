import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/profile'
import login from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
	//state: {},
	//mutations: {},
	//actions: {},
	modules: {
		user,
		login
	}
})
