import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Error from '../../src/components/Error.vue';
import store from '../../src/store';
import BootstrapVue from "bootstrap-vue";
import VueRouter from 'vue-router';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

afterEach(() => {
	wrapper.destroy();
});

describe('[ER] Error', () => {
	test('[ER-1] renders component with expected test message', async () => {
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

	test('[ER-2] renders component with error label', async () => {
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

	test('[ER-3] renders component with warning label', async () => {
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
