import { shallowMount, createLocalVue } from '@vue/test-utils';
import Component from '../../src/components/RegisterForm.vue';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import store from '../../src/store';
import Vuex from 'vuex';
import profile from "../../src/store/modules/profile";
import users from "../../src/store/modules/users";
import {BootstrapVue} from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

let wrapper;

describe('[RF] Component - Register Form', () => {
	test('[RF-1] Produces error state with email', async () => {
		wrapper = shallowMount(Component);

		wrapper.find('#email').setValue('asdf');
		wrapper.find('#full-name').setValue('robert');
		wrapper.find('#username').setValue('bob101');
		wrapper.find('#password').setValue('Password123!');
		wrapper.find('#repassword').setValue('Password123!');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(true);
	});
	test('[RF-2] produces error state with no email', async () => {
		wrapper = shallowMount(Component);

		wrapper.find('#email').setValue('');
		wrapper.find('#full-name').setValue('robert');
		wrapper.find('#username').setValue('bob101');
		wrapper.find('#password').setValue('Password123!');
		wrapper.find('#repassword').setValue('Password123!');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(true);
	});
	test('[RF-3] produces error state with non-matching passwords', async () => {
		wrapper = shallowMount(Component);

		wrapper.find('#email').setValue('asdf@asdf.com');
		wrapper.find('#full-name').setValue('robert');
		wrapper.find('#username').setValue('bob101');
		wrapper.find('#password').setValue('Password123!');
		wrapper.find('#repassword').setValue('SomethingElse');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(true);
	});

	test('[RF-4] produces error state with no username', async () => {
		wrapper = shallowMount(Component);

		wrapper.find('#email').setValue('asdf@asdf.com');
		wrapper.find('#full-name').setValue('robert');
		wrapper.find('#username').setValue('');
		wrapper.find('#password').setValue('Password123!');
		wrapper.find('#repassword').setValue('SomethingElse');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(true);
	});

	test('[RF-5] produces error state with no password', async () => {
		wrapper = shallowMount(Component);

		wrapper.find('#email').setValue('asdf@asdf.com');
		wrapper.find('#full-name').setValue('robert');
		wrapper.find('#username').setValue('');
		wrapper.find('#password').setValue('');
		wrapper.find('#repassword').setValue('SomethingElse');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(true);
	});

	test('[RF-6] produces error state with no full name', async () => {
		wrapper = shallowMount(Component);

		wrapper.find('#email').setValue('asdf@asdf.com');
		wrapper.find('#full-name').setValue('');
		wrapper.find('#username').setValue('bob123');
		wrapper.find('#password').setValue('Password123!');
		wrapper.find('#repassword').setValue('SomethingElse');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(true);
	});

	test('[RF-7] successful register', async () => {
		wrapper = shallowMount(Component, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,	
						actions: {
							createAccount: jest.fn(() => {
								return new Promise((resolve) => {
									resolve(1)
								})
							})
						},
						getters: users.getters,
						mutations: users.mutations
					},
				}
			}),
			localVue
		});

		wrapper.find('#email').setValue('mrniceguy2@gmail.com');
		wrapper.find('#full-name').setValue('Bob Builder');
		wrapper.find('#username').setValue('MrBob1234');
		wrapper.find('#password').setValue('PleaseWork123!');
		wrapper.find('#repassword').setValue('PleaseWork123!');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();

		expect(wrapper.find(".error-box").exists()).toBe(false);

		expect(CognitoUserPool).toHaveBeenCalledWith({
			UserPoolId: 'us-east-1_FfJ4ffeia',
			ClientId: '2lk7bjr0akm1ncuo8i8piqv33g'
		});
	});

	test('[RF-8]: failed register', async () => {
		wrapper = shallowMount(Component, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,
						actions: {
							createAccount: jest.fn(() => {
								return new Promise((resolve, reject) => {
									reject(new Error("some error"))
								})
							})
						},
						getters: users.getters,
						mutations: users.mutations
					},
				}
			}),
			localVue
		});

		wrapper.find('#email').setValue('mrniceguy2@gmail.com');
		wrapper.find('#full-name').setValue('Bob Builder');
		wrapper.find('#username').setValue('MrBob1234');
		wrapper.find('#password').setValue('PleaseWork123!');
		wrapper.find('#repassword').setValue('PleaseWork123!');

		wrapper.find('form').trigger('submit.prevent');

		await wrapper.vm.$nextTick();
		await new Promise((r) => setTimeout(r, 1000)); // todo, add in flush promises
		expect(wrapper.vm.validation.errors.length).toBeGreaterThan(0);
	});
});
