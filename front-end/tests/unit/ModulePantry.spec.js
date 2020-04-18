import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "../../src/store";
import pantry from './../../src/store/modules/pantry'

jest.mock('axios');

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
  state = {
    pantry: ['ingredient']
  };
});

describe("Module-Pantry", () => {
  it("Action-getPantry", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );

    const commit = jest.fn()

    await pantry.actions.getPantry({ commit })

    expect(commit).toHaveBeenCalledWith(
      "SET_PANTRY", "testpayload")
  })

  it("Action-addIngredient", async () => {
    axios.put.mockImplementation(() =>
      Promise.resolve({
        "status": 200
      })
    );

    const commit = jest.fn()

    await pantry.actions.addIngredient({ commit }, {ingredient: 'testpayload', id: 1})

    expect(commit).toHaveBeenCalledWith(
      "ADD_INGREDIENT", "testpayload")
  })

  it("Action-removeIngredient", async () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve(1)
    );

    const commit = jest.fn()

    await pantry.actions.removeIngredient({ commit },{ingredient: 'testpayload', id: 1})

    expect(commit).toHaveBeenCalledWith(
      "REMOVE_INGREDIENT", "testpayload")
  })

  it('Mutations-SET_PANTRY', () => {
    pantry.mutations.SET_PANTRY(state, ['thispantry']);
    expect(state).toEqual({
      pantry: ['thispantry'],
    });
  });

  it('Mutations-ADD_INGREDIENT', () => {
    pantry.mutations.ADD_INGREDIENT(state, 'thispantry1');
    expect(state).toEqual({
      pantry: ['ingredient','thispantry1'],
    });
  });

  it('Mutations-REMOVE_INGREDIENT', () => {
    pantry.mutations.REMOVE_INGREDIENT(state, 'ingredient');
    expect(state).toEqual({
      pantry: [],
    });
  });
})







  
