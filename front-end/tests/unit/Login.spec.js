import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import Login from '../../src/components/Login.vue';
import {BootstrapVue} from "bootstrap-vue";
import {CognitoUserPool} from 'amazon-cognito-identity-js';
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

describe('Login', () => {
	test('Login component load default', () => {
        const wrapper = shallowMount(Login, {
        });

        expect(wrapper.vm.login.username).toEqual('');
        expect(wrapper.vm.login.password).toEqual('');
        expect(wrapper.vm.validation.errors).toEqual([]);
        expect(wrapper.vm.validation.username).toEqual(false);
        expect(wrapper.vm.validation.password).toEqual(false);

		wrapper.destroy();
    });
    
    test('Login validation, empty user entry', () => {
        const wrapper = shallowMount(Login, {
        });

        const preventDefault = jest.fn();

        wrapper.vm.login.password="anything"
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.username).toEqual(true);
        expect(wrapper.vm.validation.password).toEqual(false);
        expect(wrapper.vm.validation.errors).toEqual(
            [{"id": 1, "msg": "Username is required"}]
        );

        wrapper.destroy();
    });

    test('Login validation, empty password entry', () => {
        const wrapper = shallowMount(Login, {
        });

        const preventDefault = jest.fn();

        wrapper.vm.login.username="anything"
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.username).toEqual(false);
        expect(wrapper.vm.validation.password).toEqual(true);
        expect(wrapper.vm.validation.errors).toEqual(
            [{"id": 2, "msg": "Password is required"}]
        );

        wrapper.destroy();
    });

    test('Login validation, password proper format successful submit', () => {
		wrapper = shallowMount(Login, {
			store: new Vuex.Store({
				modules: {
					users: {
						namespaced: true,
						state: users.state,
						actions: {
							login: jest.fn(() => {
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

        wrapper.vm.login.username="MrBob1234"
        wrapper.vm.login.password="testinganything123"
        wrapper.find('form').trigger('submit', { preventDefault });

        expect(wrapper.vm.validation.username).toEqual(false);
        expect(wrapper.vm.validation.password).toEqual(false);

        wrapper.destroy();

        wrapper.find('form').trigger('submit', { preventDefault });

		expect(CognitoUserPool).toHaveBeenCalledWith({
			UserPoolId: 'us-east-1_FfJ4ffeia',
			ClientId: '2lk7bjr0akm1ncuo8i8piqv33g'
        });

        wrapper.destroy();
    });
    
	test('Login component passwordusercombosubmission',async  () => {
        const wrapper = shallowMount(Login, {
        });

        expect(wrapper.vm.login.username).toEqual('');
        expect(wrapper.vm.login.password).toEqual('');
        expect(wrapper.vm.validation.errors).toEqual([]);
        expect(wrapper.vm.validation.username).toEqual(false);
        expect(wrapper.vm.validation.password).toEqual(false);

        wrapper.vm.submitEnable();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.canSubmit).toEqual(false);

        wrapper.vm.login.username="testuser"

        wrapper.vm.submitEnable();
        await wrapper.vm.$nextTick();
 
        expect(wrapper.vm.canSubmit).toEqual(false);

        wrapper.vm.login.password="testpassword"
        await wrapper.vm.$nextTick();
        wrapper.vm.submitEnable();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.canSubmit).toEqual(true);


		wrapper.destroy();
    });
    
});



