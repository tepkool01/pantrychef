import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "../../src/store";
import profile from './../../src/store/modules/profile'

jest.mock('axios');

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);



beforeEach(() => {
  state = {
    profiles: [{name:'first',id:1},{name:'second',id:2}],
    active_profile: 'first'
  };
});

describe("Module-Profile", () => {

  it("Action-createProfile", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );

    const commit = jest.fn()

    await profile.actions.createProfile({ commit },{name:'this',id:1})

    expect(commit).toHaveBeenCalledWith(
      "ADD_PROFILE", "testpayload")
  })

  it("Action-activateProfile", async () => {
    axios.put.mockImplementation(() =>
      Promise.resolve({
        "data": 1,
        "status": 200,
      })
    );

    const commit = jest.fn()

    await profile.actions.activateProfile({ commit },1)

    expect(commit).toHaveBeenCalledWith(
      "SET_ACTIVE", 1)
  })

  it("Action-getProfiles", async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": [{"id": 1, "name": "first","isActive":"false"}, {"id": 2, "name": "second","isActive":"true"}],
        "status": 200,
      })
    );

    const commit = jest.fn()

    await profile.actions.getProfiles({ commit })

    expect(commit).toHaveBeenCalledWith(
      "SET_PROFILES", [{"id": 1, "name": "first","isActive":"false"}, {"id": 2, "name": "second","isActive":"true"}])

    expect(commit).toHaveBeenCalledWith(
      "SET_ACTIVE", 2)
  })

  it("Action-getProfilesFail", async () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
      })
    );

    const commit = jest.fn()

    try{
      await profile.actions.getProfiles({ commit })
    }catch{


    }
  })

  it("Action-deleteProfile", async () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({
      })
    );

    const commit = jest.fn()

    await profile.actions.deleteProfile({ commit },1)

    expect(commit).toHaveBeenCalledWith(
      "DELETE_PROFILE", 1)
  })

  it('Mutations-SET_ACTIVE', () => {
    profile.mutations.SET_ACTIVE(state, 'second');
    expect(state).toEqual({
      profiles: [{name:'first',id:1},{name:'second',id:2}],
      active_profile: 'second'
    });
  });
  
  it('Mutations-ADD_PROFILE', () => {
      profile.mutations.ADD_PROFILE(state, {name:'newprofile',id:3});
      expect(state).toEqual({
        profiles: [{name:'first',id:1},{name:'second',id:2},{name:'newprofile',id:3}],
        active_profile: 'first'
      });
    });
  
    it('Mutations-SET_PROFILES', () => {
      profile.mutations.SET_PROFILES(state, [{name:'this',id:1},{name:'that',id:2}]);
      expect(state).toEqual({
        profiles: [{name:'this',id:1},{name:'that',id:2}],
        active_profile: 'first'
      });
    });
  
    it('Mutations-DELETE_PROFILE', () => {
      profile.mutations.DELETE_PROFILE(state, 2);
      expect(state).toEqual({
        profiles: [{name:'first',id:1}],
        active_profile: 'first'
      });
    });
})

