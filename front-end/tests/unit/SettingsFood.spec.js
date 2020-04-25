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
							name: 'Healthy',
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

describe('[SF] Settings Food Component', () => {
	test('[SF-1] renders component with preference changed to no preference', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('option').at(0).element.text).toBe('No Preference');
		wrapper.findAll('option').at(0).element.selected = true;
		wrapper.findAll('select').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});

	test('[SF-2] renders component with preference changed to vegetarian', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('option').at(1).element.text).toBe('Vegetarian');
		wrapper.findAll('option').at(1).element.selected = true;
		wrapper.findAll('select').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});

	test('[SF-3] renders component with preference changed to vegan', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('option').at(2).element.text).toBe('Vegan');
		wrapper.findAll('option').at(2).element.selected = true;
		wrapper.findAll('select').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});

	test('[SF-4] renders component with preference changed to gluten free', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('option').at(3).element.text).toBe('Gluten Free');
		wrapper.findAll('option').at(3).element.selected = true;
		wrapper.findAll('select').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});

	test('[SF-5] renders component with preference changed to dairy free', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('option').at(4).element.text).toBe('Dairy Free');
		wrapper.findAll('option').at(4).element.selected = true;
		wrapper.findAll('select').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});

	test('[SF-6] renders component with preference changed to healthy', async () => {
		await wrapper.vm.$nextTick();
		expect(wrapper.findAll('option').at(5).element.text).toBe('Healthy');
		wrapper.findAll('option').at(5).element.selected = true;
		wrapper.findAll('select').at(0).trigger('change');
		expect(wrapper.find('select').exists()).toBe(true);
	});
});
