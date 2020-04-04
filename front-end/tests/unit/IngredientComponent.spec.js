import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '../../src/components/Ingredient.vue';

let wrapper;
let store;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
    actions = {
        someAction: jest.fn()
    };
    mutations = {
        someMutation: jest.fn()
    };
    state = {
        key: {}
    };
    store = new Vuex.Store({
        actions,
        mutations,
        state,
    });
    wrapper = shallowMount(Component, {
        propsData: {
            listType: 'shopping',
            ingredient: { 
                ingredient_name: "test_ingredient"
                 }
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
    test('renders component with expected props data', () => {
        expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        expect(wrapper.vm.listType).toMatch("shopping");
        
    });
});