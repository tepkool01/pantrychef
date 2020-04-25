import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import Component from '../../src/views/Settings.vue';
import SettingsAccount from '../../src/components/SettingsAccount';
import SettingsProfiles from '../../src/components/SettingsProfiles';
import SettingsFood from '../../src/components/SettingsFood';
import store from "../../src/store";

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);


beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'Settings',
		components: {
			SettingsFood,
			SettingsProfiles,
			SettingsAccount,
		},
		mocks: {},
		stubs: {},
		methods: {},
		store,
		localVue,
	});
});

afterEach(() => {

});

describe('[SC} Settings', () => {
	test('[SC-1] renders Settings with the default data', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.$emit('title', 'Settings');
		expect(wrapper.emitted().title[0]).toEqual(['Settings']);
		wrapper.destroy();
	});
});
