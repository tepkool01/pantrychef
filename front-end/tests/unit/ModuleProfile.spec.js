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
    profiles: [{text:'first',value:1},{text:'second',value:2}],
    active_profile: 'first'
  };
});

describe("[MP] Module-Profile", () => {

  it("[MP-1] Action-createProfile", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        "data": 'testpayload',
        "status": 200,
      })
    );

    const commit = jest.fn()

    await profile.actions.createProfile({ commit },{text:'this',value:1})

    expect(commit).toHaveBeenCalledWith(
      "ADD_PROFILE", "testpayload")
  })

  it("[MP-2] Action-activateProfile", async () => {
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

  it("[MP-3] Action-getProfiles", async () => {
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

  it("[MP-4] Action-getProfilesFail", async () => {
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

  it("[MP-5] Action-deleteProfile", async () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({
      })
    );

    const commit = jest.fn()

    await profile.actions.deleteProfile({ commit },1)

    expect(commit).toHaveBeenCalledWith(
      "DELETE_PROFILE", 1)
  })

  it('[MP-6] Mutations-SET_ACTIVE', () => {
    profile.mutations.SET_ACTIVE(state, 'second');
    expect(state).toEqual({
      profiles: [{text:'first',value:1},{text:'second',value:2}],
      active_profile: 'second'
    });
  });
  
  it('[MP-7] Mutations-ADD_PROFILE', () => {
      profile.mutations.ADD_PROFILE(state, {profile_name:'newprofile',id:3});
      expect(state).toEqual({
        profiles: [{text:'first',value:1},{text:'second',value:2},{text:'newprofile',value:3}],
        active_profile: 'first'
      });
    });
  
    it('[MP-8] Mutations-SET_PROFILES', () => {
      profile.mutations.SET_PROFILES(state, [{profile_name:'this',id:1},{profile_name:'that',id:2}]);
      expect(state).toEqual({
        profiles: [{text:'this',value:1},{text:'that',value:2}],
        active_profile: 'first'
      });
    });
  
    it('[MP-9] Mutations-DELETE_PROFILE', () => {
      profile.mutations.DELETE_PROFILE(state, 2);
      expect(state).toEqual({
        profiles: [{text:'first',value:1}],
        active_profile: 'first'
      });
    });
})

