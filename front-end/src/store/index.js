import Vue from 'vue'
import Vuex from 'vuex'

import profile from './modules/profile'
import login from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	//state: {},
	//mutations: {},
	//actions: {},
	modules: {
		profile,
		login
	}
})
