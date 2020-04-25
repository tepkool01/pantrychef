import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "../../src/store";
import app from './../../src/store/modules/app';

jest.mock('axios');

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
  state = {
    loading: false
  };
});


describe("[MA] Module-App", () => {
  it('[MA-1] Mutations-SET_LOADING_STATUS', () => {
    app.mutations.SET_LOADING_STATUS(state, true);
    expect(state).toEqual({
      loading: true,
    });
  });

  it("[MA-2] Action-setLoading", async () => {
    const commit = jest.fn()

    await app.actions.setLoading({ commit },true)

    expect(commit).toHaveBeenCalledWith(
      "SET_LOADING_STATUS", true)
  })

  it("[MA-3] Action-setLoading", async () => {
    var retVal = await app.getters.currentLoadingStatus(state)

    expect(retVal).toEqual(false)
  })
})