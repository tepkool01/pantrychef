import axios from 'axios'

export default {
	getShoppingList(profile_id) {
		return axios.get('/shopping-lists/' + profile_id)
	},
	addIngredient(ingredient_id, profile_id) {
		return axios.put('/shopping-lists/' + profile_id + '/ingredients/' + ingredient_id)
	},
	deleteIngredient(ingredient_id, profile_id) {
		return axios.delete('/shopping-lists/' + profile_id + '/ingredients/' + ingredient_id)
	}
}
