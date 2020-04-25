import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AutoComplete from '../../src/components/AutoComplete.vue';
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

describe('AutoComplete', () => {


    test('AutoComplete component with expected props data', () => {
        const wrapper = shallowMount(AutoComplete, {
            propsData: {
                suggestionsMstr: 
                    [
                        {"ingredient_name": "test_ingredient", "ingreident_id": 1},
                        {"ingredient_name": "test_ingredient2", "ingreident_id": 2},
                    ],
                objectAttribute: "Test Attribute",
                componentTitle: "Test Title",
                toolTip: "Test Tip"
                }
        });

        expect(wrapper.vm.suggestionsMstr).toEqual( 
            [
                {"ingredient_name": "test_ingredient", "ingreident_id": 1}, 
                {"ingredient_name": "test_ingredient2", "ingreident_id": 2}
            ]
        );

        expect(wrapper.vm.objectAttribute).toMatch("Test Attribute");
        expect(wrapper.vm.componentTitle).toMatch("Test Title");
        expect(wrapper.vm.toolTip).toMatch("Test Tip");

        wrapper.destroy();
    });

    test('AutoComplete search on item', () => {
        const wrapper = shallowMount(AutoComplete, {
            propsData: {
                suggestionsMstr: 
                    [
                        {"ingredient_name": "test_ingredient", "ingreident_id": 1},
                        {"ingredient_name": "test_ingredient2", "ingreident_id": 2},
                    ],
                objectAttribute: "ingredient_name",
                componentTitle: "Test Title",
                toolTip: "Test Tip"
                }
        });

        wrapper.vm.queryStr="test_ingredient2"
        expect(wrapper.vm.queryStr).toMatch("test_ingredient2");
        ;

        wrapper.vm.$options.watch.queryStr.call(wrapper.vm);

        expect(wrapper.vm.suggestions).toEqual(
            [{"ingredient_name": "test_ingredient2", "ingreident_id": 2}]
        )

        wrapper.destroy();
    });


    test('AutoComplete: setState', () => {
        const wrapper = shallowMount(AutoComplete, {
            propsData: {
                suggestionsMstr: 
                    [
                        {"ingredient_name": "test_ingredient", "ingreident_id": 1},
                        {"ingredient_name": "test_ingredient2", "ingreident_id": 2},
                    ],
                objectAttribute: "ingredient_name",
                componentTitle: "Test Title",
                toolTip: "Test Tip"
                }
        });

        wrapper.vm.queryStr="test_ingredient2";
        expect(wrapper.vm.queryStr).toMatch("test_ingredient2");
        

        wrapper.vm.$options.watch.queryStr.call(wrapper.vm);

        expect(wrapper.vm.suggestions).toEqual(
            [{"ingredient_name": "test_ingredient2", "ingreident_id": 2}]
        )

        //mimic DOM click call
        wrapper.vm.setState(wrapper.vm.suggestions[0])
        expect(wrapper.vm.queryStr).toMatch("test_ingredient2");
        expect(wrapper.vm.modal).toEqual(false);
        expect(wrapper.emitted().selection.length).toBe(1);
        expect(wrapper.emitted("selection")[0][0]).toStrictEqual(
            {"ingredient_name": "test_ingredient2", "ingreident_id": 2}
        );

        wrapper.destroy();
    });


});
