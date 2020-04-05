import axios from 'axios';
import store from '../../store';

export default {
	getShoppingList(profile_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/shopping-lists/' + profile_id, config)
	},
	addIngredient(ingredient_id, profile_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.put('/shopping-lists/' + profile_id + '/ingredients/' + ingredient_id, {}, config)
	},
	deleteIngredient(ingredient_id, profile_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.delete('/shopping-lists/' + profile_id + '/ingredients/' + ingredient_id, config)
	}
}
