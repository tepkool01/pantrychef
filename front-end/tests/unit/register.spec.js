import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expect } from 'chai'
//import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
chai.use(chaiAsPromised)

import Register from '../../src/components/RegisterForm'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Register.vue', () => {
	it('fails to register with invalid credentials', () => {
		//const wrapper = shallowMount(Register, { store, localVue })
		let result = Register.methods.onSubmit()
		expect(result).to.equal(true)
	})
})
