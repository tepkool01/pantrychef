import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import store from "../../src/store";
import users from './../../src/store/modules/users'
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import api from '../../src/api';

let wrapper;
let actions;
let mutations;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('axios');

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  state = {
    isAuthenticated: false,
	username: '',
	user: {
		accessToken: '',
		idToken: '',
		refreshToken: '',
		userId: '',
		cognitoUser: null,
	},
	mealPreference: {},
	availableMealPreferences: []
  };
});


describe("[MI] Module-Users", () => {
  it('[MI-1] Mutations-SET_MEAL_PREFERENCES', () => {
    users.mutations.SET_MEAL_PREFERENCE(state, {name: 'vegan'});

    expect(state).toEqual({
      isAuthenticated: false,
      username: '',
      user: {
          accessToken: '',
          idToken: '',
          refreshToken: '',
          userId: '',
          cognitoUser: null,
      },
      mealPreference: {name: 'vegan'},
      availableMealPreferences: []
    });
  });

  it('[MI-2] Mutations-SET_AVAILABLE_MEAL_PREFERENCES', () => {
    users.mutations.SET_AVAILABLE_MEAL_PREFERENCES(state, ['testmealprep','thesecondone']);
    
    expect(state).toEqual({
      isAuthenticated: false,
    username: '',
    user: {
      accessToken: '',
      idToken: '',
      refreshToken: '',
      userId: '',
      cognitoUser: null,
    },
    mealPreference: {},
      availableMealPreferences: ['testmealprep','thesecondone']
    });
  
    expect(users.state.isAuthenticated).toEqual(false)
  
    users.state.isAuthenticated = true
  
    var retVal = users.getters.availableMealPreferences(state)
  
    expect(retVal).toEqual(["testmealprep", "thesecondone"])
  });

  it('[MI-3] Mutations-Authenticate', () => {
    users.mutations.AUTHENTICATE(state, 
    {       accessToken: '1',
            idToken: '2',
            refreshToken: '3',
            userId: '4',
            cognitoUser: 5,
    });
    expect(state).toEqual({
      isAuthenticated: true,
      username: '',
      user: {
          accessToken: '1',
          idToken: '2',
          refreshToken: '3',
          userId: '4',
          cognitoUser: 5,
      },
      mealPreference: {},
      availableMealPreferences: []
    });
  });

  it('[MI-4] Mutations-Register', () => {
    users.mutations.REGISTER(state, 
    {   accessToken: '1',
        idToken: '2',
        refreshToken: '3',
        userId: '4',
        cognitoUser: 5,
    });

    expect(state).toEqual({
      isAuthenticated: false,
      username: '',
      user: {
        accessToken: '1',
        idToken: '2',
        refreshToken: '3',
        userId: '4',
        cognitoUser: 5,
    },
    mealPreference: {},
      availableMealPreferences: []
    });
  });

  it('[MI-5] Mutations-Logout', () => {
    users.mutations.LOGOUT(state);

    expect(state).toEqual({
        isAuthenticated: false,
        username: '',
        user: {
            accessToken: '',
            idToken: '',
            refreshToken: '',
            userId: '',
            cognitoUser: null,
        },
        mealPreference: {},
        availableMealPreferences: []
    });
  });

  it('[MI-6] Mutations-ChangePassword', () => {
    users.mutations.CHANGEPASSWORD(state);

    expect(state).toEqual({
        isAuthenticated: false,
        username: '',
        user: {
            accessToken: '',
            idToken: '',
            refreshToken: '',
            userId: '',
            cognitoUser: null,
        },
        mealPreference: {},
        availableMealPreferences: []
    });
  });

  it('[MI-7] Mutations-ForgotPassword', () => {
    users.mutations.FORGOTPASSWORD(state,'thisusername');

    expect(state).toEqual({
        isAuthenticated: false,
        username: 'thisusername',
        user: {
            accessToken: '',
            idToken: '',
            refreshToken: '',
            userId: '',
            cognitoUser: null,
        },
        mealPreference: {},
        availableMealPreferences: []
    });
  });

  it('[MI-8] Mutations-UpdatePassword', () => {
    users.mutations.UPDATEPASSWORD(state,'thisusername');

    expect(state).toEqual({
        isAuthenticated: false,
        username: 'thisusername',
        user: {
            accessToken: '',
            idToken: '',
            refreshToken: '',
            userId: '',
            cognitoUser: null,
        },
        mealPreference: {},
        availableMealPreferences: []
    });
  });


  it('[MI-9] Mutations-ForgotPasswordVerification', () => {
    users.mutations.FORGOTPASSWORDVERIFICATION(state,'thisusername');

    expect(state).toEqual({
        isAuthenticated: false,
        username: '',
        user: {
            accessToken: '',
            idToken: '',
            refreshToken: '',
            userId: '',
            cognitoUser: null,
        },
        mealPreference: {},
        availableMealPreferences: []
    });
  });


    it("[MI-10] Action-GetUser", async () => {
      const commit = jest.fn()

      axios.get.mockImplementation(() =>
      Promise.resolve({
        "data": 	{
        "mealPreference": 'vegan',
        "availableMealPreferences": ['vegan','vegetarian']
        
      },
        "status": 200,
      })
    );
      await users.actions.getUserInfo({ commit })
  
      expect(commit).toHaveBeenCalledWith(
       "SET_MEAL_PREFERENCE", undefined)

       expect(commit).toHaveBeenCalledWith(
        "SET_AVAILABLE_MEAL_PREFERENCES", undefined)

    })

    it("[MI-11] Action-UpdateUserProfile", async () => {
      const commit = jest.fn()

      axios.patch.mockImplementation(() =>
      Promise.resolve()
    );

      await users.actions.updateUserInfo({ commit },'testpayload')
    })
})
