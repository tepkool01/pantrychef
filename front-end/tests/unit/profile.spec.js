import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
chai.use(chaiAsPromised)

import ProfileCreate from '../../src/components/ProfileCreate'
import profile from '../../src/store/modules/profile'
import api from '../../src/api'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ProfileCreate.vue', () => {
	let store

	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				user: profile
			}
		})
	})

	it('calls store action "createProfile" when button is clicked', () => {
		let stub = sinon.stub(api.profile, 'createProfile')
		stub.resolves({ id: 1, name: 'test' })

		const wrapper = shallowMount(ProfileCreate, { store, localVue })
		const button = wrapper.find('button')
		button.trigger('click')
		expect(api.profile.createProfile).calledOnce
	})

	it('increments the profile count by 1', () => {
		const wrapper = shallowMount(ProfileCreate, { store, localVue })
		const textInput = wrapper.find('input[type="text"]')
		const button = wrapper.find('button')

		textInput.setValue('asdf')
		button.trigger('click')
		expect(profile.state.profiles).to.have.lengthOf(1)
	})

	it('returns a mutated profile after being added', () => {
		let state = {
			profiles: []
		}
		profile.mutations.ADD_PROFILE(state, { name: 'test' })
		expect(state.profiles).to.have.lengthOf(1)
	})

	it('returns the existing profiles in the state', () => {
		expect(false)
	})
})
