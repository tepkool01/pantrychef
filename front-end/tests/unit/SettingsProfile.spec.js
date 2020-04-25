import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import SettingsProfiles from '../../src/components/SettingsProfiles.vue';
import {BootstrapVue} from "bootstrap-vue";
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import store from '../../src/store';
import profile from "../../src/store/modules/profile";

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

describe('[SP] SettingsProfiles', () => {
	test('[SP-1] SettingsProfiles component load default', () => {
		wrapper = shallowMount(SettingsProfiles, {
			store: new Vuex.Store({
				modules: {
					profile: {
                        namespaced: true,
                        state: profile.state,
						actions: {
							getProfiles: jest.fn(() => {
								return new Promise((resolve) => {
									resolve(1)
								})
                            }),
							deleteProfile: jest.fn(() => {
								return new Promise((resolve) => {
									resolve(1)
								})
							})
						},
						getters: profile.getters,
						mutations: profile.mutations
					},
				}
			}),
			localVue
        });
    });
        
        test('[SP-2] SettingsProfiles component on delete profile call', () => {
            wrapper = shallowMount(SettingsProfiles, {
                store: new Vuex.Store({
                    modules: {
                        profile: {
                            namespaced: true,
                            state: profile.state,
                            actions: {
                                getProfiles: jest.fn(() => {
                                    return new Promise((resolve) => {
                                        resolve(1)
                                    })
                                }),
                                deleteProfile: jest.fn(() => {
                                    return new Promise((resolve) => {
                                        resolve(1)
                                    })
                                })
                            },
                            getters: profile.getters,
                            mutations: profile.mutations
                        },
                    }
                }),
                localVue
            });
    
            wrapper.vm.onDelete(5);

		    wrapper.destroy();
        });
});
