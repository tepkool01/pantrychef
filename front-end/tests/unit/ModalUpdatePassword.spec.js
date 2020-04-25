import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UpdatePassword from '../../src/components/modals/UpdatePassword.vue';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import store from '../../src/store';
import users from "../../src/store/modules/users";
import BootstrapVue from "bootstrap-vue";

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
        someAction: jest.fn()
    };
    mutations = {
        someMutation: jest.fn()
    };
    state = {
        key: {}
    };
});

afterEach(() => {

});

describe('[MUP] Modal-UpdatePassword', () => {
    test('[MUP-1] Method-ResetForm', () => {
        const wrapper = shallowMount(UpdatePassword, {

        });

        wrapper.vm.validation.errors=['notempty']
        wrapper.vm.validation.oldpassword=true
        wrapper.vm.validation.password=true
        wrapper.vm.validation.repassword=true

        expect(wrapper.vm.validation.errors).toEqual(['notempty'])
        expect(wrapper.vm.validation.oldpassword).toEqual(true)
        expect(wrapper.vm.validation.password).toEqual(true)
        expect(wrapper.vm.validation.repassword).toEqual(true)

        wrapper.vm.resetForm()


        expect(wrapper.vm.validation.errors).toEqual([])
        expect(wrapper.vm.validation.oldpassword).toEqual(false)
        expect(wrapper.vm.validation.password).toEqual(false)
        expect(wrapper.vm.validation.repassword).toEqual(false)


        wrapper.destroy();
    });


    test('[MUP-2] Method-ResetForm-Empty', () => {
        const wrapper = shallowMount(UpdatePassword, {

        });

        const preventDefault = jest.fn();

        wrapper.vm.UpdatePassword({preventDefault})


        wrapper.destroy();
    });

    test('[MUP-3] Method-ResetForm-Passwords do not match', () => {
        const wrapper = shallowMount(UpdatePassword, {

        });

        const preventDefault = jest.fn();



        wrapper.vm.user.password='testpassword'
        wrapper.vm.user.repassword='differentpassword'

        wrapper.vm.UpdatePassword({preventDefault})

        expect(wrapper.vm.validation.errors).toEqual(
            [
                {id:2,msg:'Please input your current valid password'},
                {id:5,msg:'Passwords do not match'},
                {id:6,msg:"Password must have at least 1 upper case character, lower case character, and number"}
            ]
        )
        expect(wrapper.vm.validation.oldpassword).toEqual(true)
        expect(wrapper.vm.validation.password).toEqual(true)
        expect(wrapper.vm.validation.repassword).toEqual(true)

        wrapper.destroy();
    });

    test('[MUP-4] Method-ResetForm-ValidSubmission', () => {
		wrapper = shallowMount(UpdatePassword, {
			store: new Vuex.Store({
				modules: {
					users: {
                        namespaced: true,
                        state: {
                            isAuthenticated: false,
                            username: '',
                            user: {
                                accessToken: '',
                                idToken: '',
                                refreshToken: '',
                                userId: '',
                                cognitoUser: null,
                            },
                            mealPreference: {},
                            availableMealPreferences: []
                        },
						actions: {
							UpdatePassword: jest.fn(() => {
								return new Promise((resolve) => {
									resolve(1)
								})
                            }),
						},
						getters: users.getters,
						mutations: users.mutations
					},
				}
			}),
			localVue
        });

        const preventDefault = jest.fn();



        wrapper.vm.user.username='testuser'
        wrapper.vm.user.oldpassword='testpassword'
        wrapper.vm.user.password='Differentpassword1'
        wrapper.vm.user.repassword='Differentpassword1'

        wrapper.vm.UpdatePassword({preventDefault})

        wrapper.destroy();
    });


    test('[MUP-5] Method-ResetForm-ErrorOnSubmission', () => {
		wrapper = shallowMount(UpdatePassword, {
			store: new Vuex.Store({
				modules: {
					users: {
                        namespaced: true,
                        state: {
                            isAuthenticated: false,
                            username: '',
                            user: {
                                accessToken: '',
                                idToken: '',
                                refreshToken: '',
                                userId: '',
                                cognitoUser: null,
                            },
                            mealPreference: {},
                            availableMealPreferences: []
                        },
						actions: {
							UpdatePassword: jest.fn(() => {
								return new Promise((reject) => {
									err(1)
								})
                            }),
						},
						getters: users.getters,
						mutations: users.mutations
					},
				}
			}),
			localVue
        });

        const preventDefault = jest.fn();



        wrapper.vm.user.username='testuser'
        wrapper.vm.user.oldpassword='testpassword'
        wrapper.vm.user.password='Differentpassword1'
        wrapper.vm.user.repassword='Differentpassword1'

        wrapper.vm.UpdatePassword({preventDefault})

        wrapper.destroy();
    });

});
