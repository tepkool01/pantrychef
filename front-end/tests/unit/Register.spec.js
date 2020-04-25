import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import Component from '../../src/views/Register.vue';
import RegisterForm from '../../src/components/RegisterForm.vue';
import RegisterSuccess from '../../src/components/RegisterSuccess.vue';
import store from '../../src/store';
import VueRouter from 'vue-router';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'register',
		components: {
			RegisterForm,
			RegisterSuccess,
		},
		data() {
			return {
				showSuccessPage: false,
			};
		},
		mocks: {},
		stubs: {},
		methods: {},
		store,
		localVue,
	});
});

afterEach(() => {
	wrapper.destroy();
});

describe('Register', () => {
	test('renders register component as a failed component', () => {
		wrapper.vm.showSuccessComponent(false);
		expect(wrapper.vm.showSuccessPage).toEqual(false);
	});
});

describe('Register', () => {
	test('renders register component as a successful component', () => {
		wrapper.vm.showSuccessComponent(true);
		expect(wrapper.vm.showSuccessPage).toEqual(true);
	});
});
