import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '../../src/components/RecipeCard';
import store from '../../src/store';
import {BootstrapVue} from "bootstrap-vue";

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
		propsData: {
			recipe: {
				id: 40020,
				recipe_name: 'Grilled Potatoes and Onion',
				cook_time: 45,
				servings: 4,
				ingredient_count: 5,
				ingredients_in_pantry: 4,
				match_percent: '0.80',
				img_url: '40020-556x370.jpg',
				summary: 'Grilled Potatoes and Onion requires about 45 minutes from start to finish. This side dish has 236 calories, 6g of protein, and 12g of fat per serving. This gluten free and vegetarian recipe serves 4 and costs 51 cents per serving.',
				health_score: 9,
				weight_watcher_points: 8,
				vegetarian: true,
				vegan: false,
				gluten_free: true,
				dairy_free: false,
				healthy: false,
				sustainable: false,
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
		wrapper.findAll('button').at(0).trigger('submit.prevent');
		//the button below shouldve triggered getRecipeCard
		wrapper.findAll('button').at(1).trigger('submit.prevent');
		wrapper.find('#view_recipe_submission_button').trigger('submit.prevent');
		//the statement below gets error "cannot read property 'push' from undefined" from this.$router.push in getRecipeCard
		wrapper.vm.getRecipeCard(40020);
	});
});
