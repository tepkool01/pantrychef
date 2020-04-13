import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '../../src/components/RecipeCard';
import store from '../../src/store';
import { BootstrapVue } from "bootstrap-vue";

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'RecipeCard',
		data() {
			return {
				ingredients: [],
			};
		},
		props: {
			recipe: {
				recipe_name: 'Grilled Potatoes and Onion',
				ingredients_in_pantry: '6',
				ingredient_count: '6',
				cook_time: '45',
				servings: '4',
				health_score: '9%',
				weight_watcher_points: '8',
				vegan: false,
				vegetarian: true,
				gluten_free: true,
				dairy_free: false,
				healthy: false,
				sustainable: false,
				id: 40020,
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
	test('renders recipe card of specific recipe', async () => {
		await wrapper.vm.$nextTick();
		expect([]).toEqual(expect.arrayContaining(wrapper.vm.recipe.ingredients));
	});
});
