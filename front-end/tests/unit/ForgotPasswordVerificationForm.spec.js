import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ForgotPasswordVerificationForm from '../../src/components/ForgotPasswordVerificationForm.vue';
import { BootstrapVue } from "bootstrap-vue";
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import store from '../../src/store';
import users from "../../src/store/modules/users";

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);


beforeEach(() => {
    actions = {
        someAction: jest.fn()
    };
    mutations = {
        someMutation: jest.fn()
    };
    state = {
        key: {}
    }
});

afterEach(() => {

});

describe('ForgotPasswordVerificationForm', () => {
    test('ForgotPasswordVerificationForm component load default', () => {
        const wrapper = shallowMount(ForgotPasswordVerificationForm, {
        });

        expect(wrapper.vm.user.username).toEqual('');
        expect(wrapper.vm.user.newPassword).toEqual('');
        expect(wrapper.vm.user.code).toEqual('');
        expect(wrapper.vm.validation.errors).toEqual([]);
        expect(wrapper.vm.validation.code).toBe(false);
        expect(wrapper.vm.validation.newPassword).toBe(false);

        wrapper.destroy();
    });

    test('ForgotPasswordVerificationForm validation, empty code entry', () => {
        const wrapper = shallowMount(ForgotPasswordVerificationForm, {
        });

        const preventDefault = jest.fn();

        expect(wrapper.vm.user.code).toEqual('');
        wrapper.vm.user.newPassword='notempty123'
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.code).toEqual(true);
        expect(wrapper.vm.validation.errors).toEqual(
            [{"id": 1, "msg": "Verification Code is required"}]
        );

        wrapper.destroy();
    });

    test('ForgotPasswordVerificationForm validation, password less than 8 chars entry', () => {
        const wrapper = shallowMount(ForgotPasswordVerificationForm, {
        });

        const preventDefault = jest.fn();

        wrapper.vm.user.code='test134'
        expect(wrapper.vm.user.code).toEqual('test134');
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.code).toEqual(false);
        expect(wrapper.vm.validation.errors).toEqual(
            [{"id": 2, "msg": "You new Password needs to be greater than 8 characters"}]
       );

        wrapper.destroy();
    });

    test('ForgotPasswordVerificationForm validation, password proper format successful submit', () => {
		wrapper = shallowMount(ForgotPasswordVerificationForm, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,
						actions: {
							forgotPasswordVerification: jest.fn(() => {
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

        const preventDefault = jest.fn();

        wrapper.vm.user.username='MrBob1234'
        expect(wrapper.vm.user.username).toEqual('MrBob1234');

        wrapper.vm.user.code='1234'
        wrapper.vm.user.newPassword='Validpw123'
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.code).toEqual(false);

		expect(CognitoUserPool).toHaveBeenCalledWith({
			UserPoolId: 'us-east-1_FfJ4ffeia',
			ClientId: '2lk7bjr0akm1ncuo8i8piqv33g'
        });

        wrapper.destroy();
    });

    test('ForgotPasswordVerificationForm validation, password proper format rejected', () => {
		wrapper = shallowMount(ForgotPasswordVerificationForm, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,
						actions: {
							forgotPasswordVerification: jest.fn(() => {
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

        const preventDefault = jest.fn();

        wrapper.vm.user.username='MrBob1234'
        expect(wrapper.vm.user.username).toEqual('MrBob1234');

        wrapper.vm.user.code='1234'
        wrapper.vm.user.newPassword='Validpw123'
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.code).toEqual(false);

        wrapper.destroy();
    });
});
