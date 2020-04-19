import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import Component from '../../src/components/modals/ViewRecipe.vue';
import store from '../../src/store';
import router from '../../src/router';
import api from '../../src/api';
import profile from "../../src/store/modules/profile";

let wrapper;

jest.mock('axios');

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	axios.get.mockImplementation(() =>
	Promise.resolve({
		data: {
			name: '',
			cook_time: 0,
			img_url: 'test',
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
		}
	}
	)
	  );

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

describe('Close View Recipe', () => {
	test('renders Settings with the default data', async () => {

		await wrapper.vm.$nextTick();
		wrapper.vm.close();
		expect(wrapper.emitted('closeWindow')[0]).toEqual([true]);
	});
});
