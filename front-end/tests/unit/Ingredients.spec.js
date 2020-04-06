import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Ingredients from '../../src/views/Ingredients.vue';

import { EventBus } from '../eventBus'; // used for Errors
import Ingredient from '../components/Ingredient.vue';
import IngredientSubmissionPanel from '../components/IngredientSubmissionPanel.vue';
import { mapGetters, mapActions } from 'vuex';

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
});

afterEach(() => {

});

describe('Ingredients', () => {
    test('renders Ingredients view with expected props data', () => {
        const wrapper = shallowMount(Ingredients, {
            propsData: {
                pantryType: "shopping",
                sortOrder: 'default',
            },
        });

        //expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        //expect(wrapper.vm.listType).toMatch("shopping");

        wrapper.destroy();
    });

});
