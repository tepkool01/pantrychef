import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '../../src/components/ProfileCreate.vue';
import { Button } from '../../node_modules/bootstrap-vue/dist/bootstrap-vue';
import profile from '../../src/store/modules/profile.js';
import users from '../../src/store/modules/users';
import ingredients from '../../src/store/modules/ingredients';
import pantry from '../../src/store/modules/pantry';
import shoppingList from '../../src/store/modules/shoppingList';
import recipes from '../../src/store/modules/recipes';

let wrapper;
let store;

const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
	store = new Vuex.Store({
		modules: {
			profile: {
				namespaced: true,
				state: profile.state,
				actions: profile.actions,
				getters: profile.getters,
				mutations: profile.mutations,
			},
			users: {
				namespaced: true,
				state: users.state,
				actions: users.actions,
				getters: users.getters,
				mutations: users.mutations,
			},
			ingredients: {
				namespaced: true,
				state: ingredients.state,
				actions: ingredients.actions,
				getters: ingredients.getters,
				mutations: ingredients.mutations,
			},
			pantry: {
				namespaced: true,
				state: pantry.state,
				actions: pantry.actions,
				getters: pantry.getters,
				mutations: pantry.mutations,
			},
			shoppingList: {
				namespaced: true,
				state: shoppingList.state,
				actions: shoppingList.actions,
				getters: shoppingList.getters,
				mutations: shoppingList.mutations,
			},
			recipes: {
				namespaced: true,
				state: recipes.state,
				actions: recipes.actions,
				getters: recipes.getters,
				mutations: recipes.mutations,
			},
		},
	});
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
