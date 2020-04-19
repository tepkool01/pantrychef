import axios from 'axios';
import store from '../../store';

export default {
	getRecipes(payload) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};

		// Construct query string
		let queryString = payload.includeShoppingList === true ? 'shopping_list=true&' : 'shopping_list=false&';
		queryString += payload.includePantryList === true ? 'pantry_list=true&' : 'pantry_list=false&';
		queryString += 'offset=' + payload.offset + '&';
		queryString += 'limit=' + payload.limit + '&';
		queryString += 'ww=' + payload.ww + '&';
		queryString += payload.searchName.length > 0 ? 'search=' + payload.searchName : 'search=';

		return axios.get('/recipes?' + queryString, config);
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
