import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "../../src/store";
import ingredients from './../../src/store/modules/ingredients';

jest.mock('axios');

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
  state = {
    ingredients: ['ingredient']
  };
});


describe("Module-Ingredients", () => {
  it('Mutations-SET_INGREDIENTS', () => {
    ingredients.mutations.SET_INGREDIENTS(state, ['thisingredient']);
    expect(state).toEqual({
      ingredients: ['thisingredient'],
    });
  });

  it("Action-getIngredients", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );
    const commit = jest.fn()

    await ingredients.actions.getIngredients({ commit })

    expect(commit).toHaveBeenCalledWith(
      "SET_INGREDIENTS", "testpayload")
  })
})