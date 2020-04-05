import axios from 'axios';
import store from '../../store';

export default {
	getRecipes() {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/recipes', config);
	},
	getIngredients(recipe_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/recipes/' + recipe_id + '/ingredients', config)
	},
	getRecipe(recipe_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/recipes/' + recipe_id, config);
	}
}
