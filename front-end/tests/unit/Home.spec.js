import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import {BootstrapVue} from 'bootstrap-vue';
import HomeView from '../../src/views/Home.vue';
import Login from '../../src/components/Login.vue';

let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);


beforeEach(() => {
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

describe('[HV] Home View', () => {
	test('[HV-1] Home view component load default', () => {
		const wrapper = shallowMount(HomeView, {
			name: 'home',
			components: {
				Login,
			},
		});
		wrapper.vm.$emit('title', 'Home');
		expect(wrapper.emitted().title[0]).toEqual(['Home']);
		wrapper.destroy();
	});
});
