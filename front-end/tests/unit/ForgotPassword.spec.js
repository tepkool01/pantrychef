import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import Component from '../../src/views/ForgotPassword.vue';
import ForgotPasswordForm from '../../src/components/ForgotPasswordForm.vue';
import ForgotPasswordVerificationForm from '../../src/components/ForgotPasswordVerificationForm.vue';
import ForgotPasswordSuccess from '../../src/components/ForgotPasswordSuccess.vue';
import store from '../../src/store';
import VueRouter from 'vue-router';

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

beforeEach(() => {
	wrapper = shallowMount(Component, {
		name: 'forgotPassword',
		components: {
			ForgotPasswordForm,
			ForgotPasswordVerificationForm,
			ForgotPasswordSuccess,
		},
		data() {
			return {
				showSuccessPage: false,
				showVerificationPage: false,
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

describe('Component', () => {
	test('renders forgot password with failed verification', () => {
		wrapper.vm.showVerificationComponent(false);
		expect(wrapper.vm.showVerificationPage).toEqual(false);
	});
});

describe('Component', () => {
	test('renders forgot password with success verification', () => {
		wrapper.vm.showVerificationComponent(true);
		expect(wrapper.vm.showVerificationPage).toEqual(true);
	});
});

describe('Component', () => {
	test('renders forgot password with failed success component', () => {
		wrapper.vm.showSuccessComponent(false);
		expect(wrapper.vm.showSuccessPage).toEqual(false);
	});
});

describe('Component', () => {
	test('renders forgot password with success component', () => {
		wrapper.vm.showSuccessComponent(true);
		expect(wrapper.vm.showSuccessPage).toEqual(true);
	});
});
