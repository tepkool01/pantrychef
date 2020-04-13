import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import IngredientSubmissionPanel from '../../src/components/IngredientSubmissionPanel.vue';
import {BootstrapVue} from "bootstrap-vue";
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import store from '../../src/store';
import users from "../../src/store/modules/users";

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);


beforeEach(() => {
	actions = {
		someAction: jest.fn(),
	};
	mutations = {
		someMutation: jest.fn(),
	};
	state = {
		key: {},
	};
});

afterEach(() => {

});

describe('IngredientSubmissionPanel', () => {
	test('IngredientSubmissionPanel component load default', () => {
        const wrapper = shallowMount(IngredientSubmissionPanel, {
            propsData: {
                suggestionsMstr: 
                    [
                        {"ingredient_name": "test_ingredient", "ingreident_id": 1},
                        {"ingredient_name": "test_ingredient2", "ingreident_id": 2},
                    ],
            }
        });

		wrapper.destroy();
    });
    
	test('IngredientSubmissionPanel selection event', () => {
        const wrapper = shallowMount(IngredientSubmissionPanel, {
            propsData: {
                suggestionsMstr: 
                    [
                        {"ingredient_name": "test_ingredient", "ingreident_id": 1},
                        {"ingredient_name": "test_ingredient2", "ingreident_id": 2},
                    ],
            }
        });
     
        wrapper.vm.selectionEvent('testentry');
        expect(wrapper.vm.selected_ingredient).toMatch("testentry");
        
        wrapper.destroy();
	});

    test('IngredientSubmissionPanel child event', () => {
        const wrapper = shallowMount(IngredientSubmissionPanel, {
            propsData: {
                suggestionsMstr: 
                    [
                        {"ingredient_name": "test_ingredient", "ingreident_id": 1},
                        {"ingredient_name": "test_ingredient2", "ingreident_id": 2},
                    ],
            }
        });
     
        wrapper.vm.selected_ingredient={"ingredient_name": "test_ingredient2", "ingreident_id": 2};
        wrapper.vm.childEvent();

        expect(wrapper.emitted().clickedItem.length).toBe(1);
        
        wrapper.destroy();
	});
});
