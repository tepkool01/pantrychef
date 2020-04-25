import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Ingredient from '../../src/components/Ingredient.vue';
import BootstrapVue from "bootstrap-vue";

let wrapper;
let store;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

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

describe('[IC] Ingredient', () => {


    test('[IC-1] (Shopping Type) renders Ingredient component with expected props data', () => {
        const wrapper = shallowMount(Ingredient, {
            propsData: {
                listType: 'shopping',
                ingredient: { 
                    ingredient_name: "test_ingredient"
                }
            }
        });

        expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        expect(wrapper.vm.listType).toMatch("shopping");

        wrapper.destroy();
    });


    test('[IC-2] (Search Type) renders Ingredient component with expected props data', () => {
        const wrapper = shallowMount(Ingredient, {
            propsData: {
                listType: 'search',
                ingredient: { 
                    ingredient_name: "test_ingredient"
                }
            }
        });

        expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        expect(wrapper.vm.listType).toMatch("search");

        wrapper.destroy();
    });

    test('[IC-3] (Pantry Type) renders Ingredient component with expected props data', () => {
        const wrapper = shallowMount(Ingredient, {
            propsData: {
                listType: 'pantry',
                ingredient: { 
                    ingredient_name: "test_ingredient"
                }
            }
        });

        expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        expect(wrapper.vm.listType).toMatch("pantry");

        wrapper.destroy();
    });

    test('[IC-4] (Search Type) Remove Button Action', () => {
        const wrapper = shallowMount(Ingredient, {
            propsData: {
                listType: 'search',
                ingredient: { 
                    ingredient_name: "test_ingredient",
                    ingreident_id: 1
                }
            }
        });

        expect(wrapper.vm.ingredient.ingredient_name).toMatch("test_ingredient");
        expect(wrapper.vm.listType).toMatch("search");

        wrapper.vm.handleRemoveIngredient = jest.fn();

        const removeBtn = wrapper.find('.remove_button');
        removeBtn.trigger('click');
        expect(wrapper.emitted().removeCall.length).toBe(1);
        expect(wrapper.emitted().removeCall[0]).toEqual(
            [{"ingredient_name": "test_ingredient", "ingreident_id": 1}]
        )
        wrapper.destroy();
    });
});
