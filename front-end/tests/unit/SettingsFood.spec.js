import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '../../src/components/SettingsFood.vue';
import store from '../../src/store';
import {BootstrapVue} from "bootstrap-vue";
import {mapGetters, mapActions} from 'vuex';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'SettingsFood',
		computed: {
			availableMealPreferences: {
				get: function () {
					return [
						{
							id: 1,
							name: 'No Preference',
						},
						{
							id: 2,
							name: 'Vegetarian',
						},
						{
							id: 3,
							name: 'Vegan',
						},
						{
							id: 4,
							name: 'Gluten Free',
						},
						{
							id: 5,
							name: 'Dairy Free',
						},
						{
							id: 6,
							name: 'Healty',
						},
					]
				},
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
	test('renders component with preference changed to vegetarian', async () => {
		// ID = 1 (No Preference)
		// ID = 2 (Vegetarian)
		// ID = 3 (Vegan)
		// ID = 4 (Gluten Free)
		// ID = 5 (Dairy Free)
		// ID = 6 (Healty)
		await wrapper.vm.$nextTick();
		wrapper.findAll('option').at(1).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
		//expect(wrapper.vm.meal_preference.id().toEqual(1))
		//expect(wrapper.vm.valueOf('data-v-37eeca36')).toEqual(1);
	});
});
describe('Component', () => {
	test('renders component with preference changed to vegan', async () => {
		// ID = 1 (No Preference)
		// ID = 2 (Vegetarian)
		// ID = 3 (Vegan)
		// ID = 4 (Gluten Free)
		// ID = 5 (Dairy Free)
		// ID = 6 (Healty)
		await wrapper.vm.$nextTick();
		wrapper.findAll('option').at(2).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});
});
describe('Component', () => {
	test('renders component with preference changed to gluten free', async () => {
		// ID = 1 (No Preference)
		// ID = 2 (Vegetarian)
		// ID = 3 (Vegan)
		// ID = 4 (Gluten Free)
		// ID = 5 (Dairy Free)
		// ID = 6 (Healty)
		await wrapper.vm.$nextTick();
		wrapper.findAll('option').at(3).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});
});
describe('Component', () => {
	test('renders component with preference changed to dairy free', async () => {
		// ID = 1 (No Preference)
		// ID = 2 (Vegetarian)
		// ID = 3 (Vegan)
		// ID = 4 (Gluten Free)
		// ID = 5 (Dairy Free)
		// ID = 6 (Healty)
		await wrapper.vm.$nextTick();
		wrapper.findAll('option').at(4).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});
});
describe('Component', () => {
	test('renders component with preference changed to healthy', async () => {
		// ID = 1 (No Preference)
		// ID = 2 (Vegetarian)
		// ID = 3 (Vegan)
		// ID = 4 (Gluten Free)
		// ID = 5 (Dairy Free)
		// ID = 6 (Healty)
		await wrapper.vm.$nextTick();
		wrapper.findAll('option').at(5).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});
});
describe('Component', () => {
	test('renders component with preference changed to no preference', async () => {
		// ID = 1 (No Preference)
		// ID = 2 (Vegetarian)
		// ID = 3 (Vegan)
		// ID = 4 (Gluten Free)
		// ID = 5 (Dairy Free)
		// ID = 6 (Healty)
		await wrapper.vm.$nextTick();
		wrapper.findAll('option').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});
});
