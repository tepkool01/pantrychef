import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
chai.use(chaiAsPromised)

import Login from '../../src/components/LoginMain'
import user from '../../src/store/modules/users'
import api from '../../src/api'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('LoginMain.vue', () => {
	let store

	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				user: user
			}
		})
	})

	it('user state is mutated to authenticated after login', () => {
		let state = {
			isAuthenticated: false
		}

		user.mutations.AUTHENICATE(state)
		expect(state.isAuthenticated).to.equal(true)
	})

	it('calls the api when the login button is clicked', () => {
		let stub = sinon.stub(api.users, 'authenticate')
		stub.resolves('test', 'test')

		const wrapper = shallowMount(Login, { store, localVue })
		const button = wrapper.find('button')
		button.trigger('click')
		expect(api.login.authenticate).calledOnce
	})

	//it('fails to login with invalid credentials', () => {
	//	//const wrapper = shallowMount(Login, { store, localVue })

	//	let result = Login.methods.onSubmit()
	//	expect(result).to.equal(true)
	//})
})
