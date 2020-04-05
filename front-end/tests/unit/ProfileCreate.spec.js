import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '../../src/components/ProfileCreate.vue';
import { Button } from '../../node_modules/bootstrap-vue/dist/bootstrap-vue';
import store from '../../src/store';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'ChefProfile',
		components: {
			'<b-button>': Button,
		},
		data() {
			return {
				profile: {
					name: '',
					ingredients: [],
				},
			};
		},
		mocks: {},
		stubs: {},
		methods: {},
		store,
		localVue,
	});
});

afterEach(() => {
	wrapper.destroy();
});

describe('Component', () => {
	test('renders component with expected default data', () => {
		expect(wrapper.vm.profile.name).toMatch('');
		expect([]).toEqual(expect.arrayContaining(wrapper.vm.profile.ingredients));
	});
});
describe('Component', () => {
	test('renders component with expected profile name and ingredient data', () => {
		wrapper.vm.profile = {
			name: 'NewProfile',
			ingredients: ['Butter'],
		};
		expect(wrapper.vm.profile.name).toMatch('NewProfile');
		expect(['Butter']).toEqual(expect.arrayContaining(wrapper.vm.profile.ingredients));
		wrapper.vm.onSubmit();
		expect(wrapper.vm.profile.name).toMatch('');
		expect([]).toEqual(expect.arrayContaining(wrapper.vm.profile.ingredients));
	});
});
