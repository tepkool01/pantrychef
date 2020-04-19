import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import About from '../../src/views/About.vue';
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
		wrapper = shallowMount(About, {
			localVue
		});


	});

});
