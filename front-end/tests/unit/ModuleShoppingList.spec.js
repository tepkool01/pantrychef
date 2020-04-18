import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "../../src/store";
import shoppingList from './../../src/store/modules/shoppingList';

jest.mock('axios');

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
  state = {
    shopping: ['ingredient']
  };
});


describe("Module-Shopping", () => {
  it('Mutations-SET_SHOPPING', () => {
    shoppingList.mutations.SET_SHOPPING(state, 'thisingredient');
    expect(state).toEqual({
      shopping: 'thisingredient',
    });
  });

  it('Mutations-ADD_INGREDIENT', () => {
    shoppingList.mutations.ADD_INGREDIENT(state, 'thisingredient');
    expect(state).toEqual({
      shopping: ['ingredient','thisingredient'],
    });
  });

  it('Mutations-REMOVE_INGREDIENT', () => {
    shoppingList.mutations.REMOVE_INGREDIENT(state, 'ingredient');
    expect(state).toEqual({
      shopping: [],
    });
  });


  it("Action-getShoppingList", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );

    const commit = jest.fn()

    await shoppingList.actions.getShoppingList({ commit }, 1)

    expect(commit).toHaveBeenCalledWith(
      "SET_SHOPPING", "testpayload")
  })

  it("Action-addIngredient", async () => {
    axios.put.mockImplementation(() =>
      Promise.resolve({})
    );

    const commit = jest.fn()

    await shoppingList.actions.addIngredient({ commit }, { ingredient:'test'})

    expect(commit).toHaveBeenCalledWith(
      "ADD_INGREDIENT", "test")
  })

  it("Action-removeIngredient", async () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({})
    );

    const commit = jest.fn()

    await shoppingList.actions.removeIngredient({ commit }, 
        { ingredient: 
            { id: 1, profileId: 5 }
        })

    expect(commit).toHaveBeenCalledWith(
        "REMOVE_INGREDIENT", {"id": 1, "profileId": 5}  )
  })
})