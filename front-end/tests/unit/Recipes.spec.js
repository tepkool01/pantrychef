import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Recipes from '../../src/views/Recipes.vue';
import store from '../../src/store';
import router from '../../src/router';

import { EventBus } from '../../src/eventBus'; // used for Errors
import Ingredient from '../../src/components/Ingredient.vue';
import IngredientSubmissionPanel from '../../src/components/IngredientSubmissionPanel.vue';
import { mapGetters, mapActions } from 'vuex';
import Component from "../../src/components/ProfileCreate";

const localVue = createLocalVue();
localVue.use(Vuex);


afterEach(() => {

});

describe('Recipes', () => {
    test('renders Recipes view with expected props data', () => {
        const wrapper = shallowMount(Recipes, {
			store,
			router,
        });

        //expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        //expect(wrapper.vm.listType).toMatch("shopping");

        wrapper.destroy();
    });

});
