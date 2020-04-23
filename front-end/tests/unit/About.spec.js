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

describe('About', () => {
	test('Renders Page', async () => {
		wrapper = shallowMount(About, {
			localVue
		});


	});

});