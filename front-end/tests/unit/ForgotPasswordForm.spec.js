import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import ForgotPasswordForm from '../../src/components/ForgotPasswordForm.vue';
import BootstrapVue from "bootstrap-vue";
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import store from '../../src/store';
import users from "../../src/store/modules/users";
import VueRouter from 'vue-router';

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);


beforeEach(() => {
	jest.spyOn(console, 'warn').mockImplementation(() => {});
	jest.spyOn(console, 'error').mockImplementation(() => {});
	
	actions = {
		someAction: jest.fn(),
	};
	mutations = {
		someMutation: jest.fn(),
	};
	state = {
		key: {},
	};
});

afterEach(() => {

});

describe('ForgotPasswordForm', () => {
	test('ForgotPasswordForm component load default', () => {
		const wrapper = shallowMount(ForgotPasswordForm, {});


		expect(wrapper.vm.user.username).toEqual('');
		expect(wrapper.vm.validation.errors).toEqual([]);
		expect(wrapper.vm.validation.username).toBe(false);

		wrapper.destroy();
	});

	test('ForgotPasswordForm validation', () => {
		const wrapper = shallowMount(ForgotPasswordForm, {});

		const preventDefault = jest.fn();

		expect(wrapper.vm.user.username).toEqual('');
		wrapper.find('form').trigger('submit', {preventDefault});

		wrapper.destroy();
	});

	test('ForgotPasswordForm rejected submission', async () => {
		wrapper = shallowMount(ForgotPasswordForm, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,
						actions: {
							forgotPassword: jest.fn(() => {
								return new Promise((resolve, reject) => {
									reject(new Error('some error'));
								});
							}),
						},
						getters: users.getters,
						mutations: users.mutations,
					},
				},
			}),
			localVue,
		});

		const preventDefault = jest.fn();

		wrapper.vm.user.username = 'MrBob1234'
		expect(wrapper.vm.user.username).toEqual('MrBob1234');
		wrapper.find('form').trigger('submit', {preventDefault});

		expect(CognitoUserPool).toHaveBeenCalledWith({
			UserPoolId: 'us-east-1_FfJ4ffeia',
			ClientId: '2lk7bjr0akm1ncuo8i8piqv33g',
		});
		wrapper.destroy();
	});

	test('ForgotPasswordForm approved submission', async () => {
		wrapper = shallowMount(ForgotPasswordForm, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,
						actions: {
							forgotPassword: jest.fn(() => {
								return new Promise((resolve) => {
									resolve(1);
								});
							}),
						},
						getters: users.getters,
						mutations: users.mutations,
					},
				},
			}),
			localVue,
		});

		const preventDefault = jest.fn();

		wrapper.vm.user.username = 'MrBob1234'
		expect(wrapper.vm.user.username).toEqual('MrBob1234');
		wrapper.find('form').trigger('submit', { preventDefault });

		expect(CognitoUserPool).toHaveBeenCalledWith({
			UserPoolId: 'us-east-1_FfJ4ffeia',
			ClientId: '2lk7bjr0akm1ncuo8i8piqv33g',
		});

		wrapper.destroy();
	});
});
