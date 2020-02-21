import { shallowMount, createLocalVue } from '@vue/test-utils'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import Vuex from 'vuex'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
chai.use(chaiAsPromised)

import Login from '../../src/components/Login'
import user from '../../src/store/modules/users'
import api from '../../src/api'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login.vue', () => {
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
			isAuthenticated: false,
			user: null
		}
		let response = AmazonCognitoIdentity.CognitoUser

		user.mutations.AUTHENICATE(state, response)
		expect(state.isAuthenticated).to.equal(true)
		expect(state.user).to.not.be.null
	})

	it('user state is mutated after registration', () => {
		let state = {
			isAuthenticated: false,
			user: null
		}
		let response = AmazonCognitoIdentity.CognitoUser

		user.mutations.REGISTER(state, response)
		expect(state.isAuthenticated).to.equal(true)
		expect(state.user).to.not.be.null
	})

	it('user state is invalidated after logout', () => {
		let state = {
			isAuthenticated: true,
			user: AmazonCognitoIdentity.CognitoUser
		}

		user.mutations.LOGOUT(state)
		expect(state.isAuthenticated).to.equal(false)
		expect(state.user).to.be.null
	})

	it('calls the api when the login button is clicked', () => {
		let stub = sinon.stub(api.users, 'authenticate')
		stub.resolves('test', 'test')

		const wrapper = shallowMount(Login, { store, localVue })
		const button = wrapper.find('button')
		button.trigger('click')
		expect(api.users.authenticate).calledOnce
	})

	it('fails to log in with invalid credentials', () => {
		api.users.authenticate('invalidUser', 'invalidPassword').then(response => {
			console.log(response)
			expect(response).to.be.null
		})
	})

	it('logs in with valid credentials', () => {
		api.users.authenticate('test','test').then(response => {
			expect(response).to.not.be.null
		})
	})


	it('logs out of an authenticated account', () => {
		var user = api.users.getUser("test2")
		api.users.logout(user)
		expect().to.not.cause.error
	})

	it('fails to log out of an authenticated account', () => {
		var user = api.users.getUser("test2")
		api.users.logout(user)
		expect().to.cause.error
	})

	it('register a new user', () => {
		var response = api.users.register("Test3", "TestTest3", "test@test.com").
		console.log(response)
		expect(response).to.not.be.null
	})

	//it('logs in with valid credentials', () => {
	//	api.users.logout(cognitoUser).then(response => {
	//		expect(response).to.not.be.null
	//	})
	//})

	//it('fails to login with invalid credentials', () => {
	//	//const wrapper = shallowMount(Login, { store, localVue })

	//	let result = Login.methods.onSubmit()
	//	expect(result).to.equal(true)
	//})
})
