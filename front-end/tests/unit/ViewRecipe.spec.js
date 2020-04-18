import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import Component from '../../src/views/ViewRecipe.vue';
import store from '../../src/store';
import router from '../../src/router';
import api from '../../src/api';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'RecipeCard',
		data() {
			return {
				recipe: {
					name: '',
					cook_time: 0,
					img_url: '',
					servings: 0,
					summary: '',
					health_score: 4,
					weight_watcher_points: 2,
					vegetarian: false,
					vegan: false,
					gluten_free: false,
					dairy_free: false,
					healthy: false,
					sustainable: false,
					directions: [],
					ingredients: [],
				},
			};
		},
		mocks: {},
		stubs: {},
		store,
		router,
		localVue,
	});
});

afterEach(() => {
	wrapper.destroy();
});

describe('View Recipe', () => {
	test('renders view recipe card for a specific recipe', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.addFavoriteRecipe(40020);
		expect(['Butter', 'Potatoes', 'Pepper', 'Red Onion', 'Salt']).toEqual(expect.arrayContaining(wrapper.vm.recipe.ingredients));
	});
});

describe('Settings', () => {
	test('renders Settings with the default data', async () => {
		await wrapper.vm.$nextTick();
		
	});
});
