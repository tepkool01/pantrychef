import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Error from '../../src/components/Error.vue';
import store from '../../src/store';
import { BootstrapVue } from "bootstrap-vue";

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

afterEach(() => {
	wrapper.destroy();
});

describe('Error', () => {
	test('renders component with expected test message', async () => {
		wrapper = shallowMount(Error, {
			propsData: {
				msg: 'Test Message',
				severity: 2,
				type: 'Info',
			},
			store,
			localVue,
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find('.err-msg').text())
			.toBe('Test Message');
		expect(wrapper.find('.err-type').text())
			.toBe('Info');
	});

	test('renders component with error label', async () => {
		wrapper = shallowMount(Error, {
			propsData: {
				msg: 'Test Message',
				severity: 1,
				type: 'Error',
			},
			store,
			localVue,
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find('.err-type').text())
			.toBe('Error');
	});

	test('renders component with warning label', async () => {
		wrapper = shallowMount(Error, {
			propsData: {
				msg: 'Test Message',
				severity: 2,
				type: 'Warning',
			},
			store,
			localVue,
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find('.err-type').text())
			.toBe('Warning');
	});
});
