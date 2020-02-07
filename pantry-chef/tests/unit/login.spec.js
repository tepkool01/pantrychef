import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expect } from 'chai'
//import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
chai.use(chaiAsPromised)

import Login from '../../src/components/Login'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login.vue', () => {
	it('fails to login with invalid credentials', () => {
		//const wrapper = shallowMount(Login, { store, localVue })
		let result = Login.methods.onSubmit()
		expect(result).to.equal(true)
	})
})
