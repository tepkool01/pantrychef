import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import Component from '../../src/views/Pantry.vue';
import store from '../../src/store';
import router from '../../src/router';
import { EventBus } from '../../src/eventBus'; // used for Errors

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'Pantry',
		data() {
			return {
				sortOrder: 'default',
				shoppingSortOrder: 'default',
				ww_score: 25,
			};
		},
		computed: {
			orderedListOptions() {
				return {
					default: (list) => {
						return list;
					},
				};
			},
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

describe('Component', () => {
	test('renders pantry card for adding an ingredient from shopping list', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.addIngredientToShoppingList('Butter');
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
		expect(wrapper.find('button').exists()).toBe(true);
	});
});

describe('Component', () => {
	test('renders pantry card for removing an ingredient from shopping list', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.removeIngredientFromShopping('Butter');
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
		expect(wrapper.find('#ingredient_remove_butter').exists()).toBe(false);
	});
});

describe('Component', () => {
	test('renders pantry card for adding an ingredient to the pantry', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.addIngredientToPantry('Butter');
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
		expect(wrapper.contains('button')).toBe(true);
	});
});

describe('Component', () => {
	test('renders pantry card for removing an ingredient from the pantry', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.handleIngredientRemove('Butter');
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
		expect(wrapper.find('#ingredient_remove_butter').exists()).toBe(false);
	});
});

describe('Component', () => {
	test('renders pantry card for removing an ingredient from the pantry', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.viewRecipe(40020);
		expect(wrapper.find('ingredientsubmissionpanel-stub').exists()).toBe(true);
	});
});

describe('Component', () => {
	test('renders pantry card for removing an ingredient from the pantry', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.goToRecipes();
		expect(wrapper.find('span').exists()).toBe(false);
	});
});

describe('Component', () => {
	test('renders pantry card for an profile that is not found', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.$options.watch.activeProfile(null);
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});

describe('Component', () => {
	test('renders pantry card for an active profile', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.$options.watch.pantryList([]);
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});

describe('Component', () => {
	test('renders pantry card with zero ingredients', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.$options.watch.ingredients([]);
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});

describe('Component', () => {
	test('renders the weight watchers score', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.$options.watch.ww_score(23);
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});

describe('Component', () => {
	test('renders the smallest weight watchers score', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.$options.watch.smallest_ww_meal(23);
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});
