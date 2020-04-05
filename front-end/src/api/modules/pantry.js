import axios from 'axios';
import store from '../../store';

export default {
	getPantry(profile) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/pantry/' + profile, config)
	},
	addIngredient(ingredient_id, profile_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.put('/pantry/' + profile_id + '/ingredients/' + ingredient_id, config)
	},
	deleteIngredient(ingredient_id, profile_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.delete('/pantry/' + profile_id + '/ingredients/' + ingredient_id, config)
	}
}
