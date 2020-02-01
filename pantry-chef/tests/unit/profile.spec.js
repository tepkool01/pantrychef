import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ProfileCreate from "../../src/components/ProfileCreate";
import user from "../../src/store/modules/user";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ProfileCreate.vue", () => {
	let actions;
  let state;
	let store;

  beforeEach(() => {
		state = {
			profiles: []
    };

		actions = {
			createProfile: jest.fn()
    };

		store = new Vuex.Store({
      modules: {
				user
			}
		});
	});

	it('calls store action "createProfile" when button is clicked', () => {
    const wrapper = shallowMount(ProfileCreate, { store, localVue });
    const button = wrapper.find("button");
    button.trigger("click");
		expect(actions.createProfile).toHaveBeenCalled();
  });

	// it('renders "state.clicks" in first p tag', () => {
	//     const wrapper = shallowMount(MyComponent, { store, localVue });
	//     const p = wrapper.find('p');
	//     expect(p.text()).toBe(state.clicks.toString());
  // })
});
