import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UpdateUsername from '../../src/components/modals/UpdateUsername.vue';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import store from '../../src/store';
import users from "../../src/store/modules/users";
import {BootstrapVue} from "bootstrap-vue";

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

describe('[MUR] Modal-UpdateUsername', () => {
    test('[MUR-1] handleOKEvent', () => {
        const preventDefault = jest.fn();
        const wrapper = shallowMount(UpdateUsername, {

        });
        
        wrapper.vm.handleOk({preventDefault})

        wrapper.destroy();
    });
});
