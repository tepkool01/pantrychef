import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "../../src/store";
import recipes from './../../src/store/modules/recipes';

jest.mock('axios');

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
  state = {
    recipes: ['recipe']
  };
});


describe("Module-Recipes", () => {
  it('Mutations-SET_RECIPES', () => {
    recipes.mutations.SET_RECIPES(state, 'thisRecipe');
    expect(state).toEqual({
      recipes: 'thisRecipe',
    });
  });


  it("Action-getRecipes", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );

    const commit = jest.fn()

    await recipes.actions.getRecipes({ commit }, {includeShoppingList:false,includePantrylist:true,searchName:''})

    expect(commit).toHaveBeenCalledWith(
      "SET_RECIPES", "testpayload")
  })

  it("Action-getRecipeIngredients", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );

    const commit = jest.fn()

    var retVal = await recipes.actions.getRecipeIngredients({ commit }, 1)

    expect(retVal).toEqual({"data": "testpayload", "status": 200})


    })
})