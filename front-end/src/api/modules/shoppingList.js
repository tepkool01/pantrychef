import axios from 'axios'

export default {
	getShoppingList() {
		return axios.get('/shopping-lists')
	},
	addIngredient(ingredient) {
		return axios.post('/shopping-lists', ingredient)
	},
	deleteItem(ingredient) {
		return axios.delete('/shopping-lists', ingredient)
	}
}
