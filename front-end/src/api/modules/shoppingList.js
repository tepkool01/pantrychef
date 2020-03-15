import axios from 'axios'

export default {
	getShoppingList() {
		return axios.get('/shopping-lists')
	},
	addIngredient(profile_id, ingredient_id) {
		return axios.put('/shopping-lists/' + profile_id + '/ingredients/' + ingredient_id)
	},
	deleteIngredient(profile_id, ingredient_id) {
		return axios.delete('/shopping-lists/' + profile_id + '/ingredients/' + ingredient_id)
	}
}
