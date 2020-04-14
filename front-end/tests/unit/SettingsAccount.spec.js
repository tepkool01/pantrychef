import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import Component from '../../src/components/SettingsAccount.vue';
import store from '../../src/store';
import UpdateUsername from '../../src/components/modals/UpdateUsername.vue';
import UpdatePassword from '../../src/components/modals/UpdatePassword.vue';
import {mapGetters, mapActions} from 'vuex';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'SettingsAccount',
		components: { UpdateUsername, UpdatePassword },
		computed: {
			users: {
				get: function () {
					return [
						{
							userId: 1,
						},
					]
				},
			},
		},
		mocks: {},
		stubs: {},
		store,
		localVue,
	});
});

afterEach(() => {
	wrapper.destroy();
});

describe('Component', () => {
	test('renders component with settings account to update password', async () => {
		await wrapper.vm.$nextTick();
		wrapper.find('#update_password_button').trigger('submit.prevent');
	});
});
describe('Component', () => {
	test('renders component with settings account to update username', async () => {
		await wrapper.vm.$nextTick();
		wrapper.find('#update_username_button').trigger('submit.prevent');
	});
});
