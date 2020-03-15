import axios from 'axios'

export default {
	getShoppingList() {
		return axios.get('/shopping-lists')
	},
	addItem(ingredient) {
		return axios.post('/shopping-lists', ingredient)
	},
	deleteItem(ingredient) {
		return axios.delete('/shopping-lists', ingredient)
	}
}
