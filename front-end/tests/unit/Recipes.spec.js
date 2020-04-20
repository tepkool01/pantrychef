import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { mapActions } from 'vuex'
import { BootstrapVue } from 'bootstrap-vue';
import Component from '../../src/views/Recipes.vue';
import store from '../../src/store';
import router from '../../src/router';
import { EventBus } from '../../src/eventBus'; // used for Errors

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'recipes',
		propsData: {
			includeShoppingList: false,
			includePantryList: true,
			searchName: '',
			timer: null,
			offset: 0,
			ww: 0,
		},
		computed: {
			isrecipeOpen() {
				return this.$route.name === 'ViewRecipe'
			},
		},
		methods: {
			...mapActions('recipes', {
				getRecipes: 'getRecipes',
			}),
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
	test('renders recipe cards by searching the names', async () => {
		await wrapper.vm.$nextTick();
		wrapper.vm.searchByName('Butter');
		//console.log(wrapper.vm.includeShoppingList);
		//console.log(wrapper.vm.includePantryList);
		//console.log(wrapper.vm.searchName);
		//console.log(wrapper.vm.timer);
		//console.log(wrapper.vm.offset);
		//console.log(wrapper.vm.ww);
		expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});

describe('Component', () => {
	test('renders the recipes for an active profile', async () => {
		await wrapper.vm.$nextTick();
		//wrapper.vm.$options.watch.activeProfile(13);
	});
});

describe('Component', () => {
	test('renders the recipes including the shopping list', async () => {
		await wrapper.vm.$nextTick();
		//wrapper.vm.$options.watch.includeShoppingList(13);
		//expect(wrapper.emitted('title')[0]).toEqual(['Pantry']);
	});
});

describe('Component', () => {
	test('renders the recipes including the pantry list', async () => {
		await wrapper.vm.$nextTick();
		//wrapper.vm.$options.watch.includePantryList(13);
	});
});
