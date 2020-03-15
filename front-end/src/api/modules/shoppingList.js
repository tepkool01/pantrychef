import axios from 'axios'

export default {
	getShoppingList() {
		return axios.get('/shoppingList')
	},
	addItem(ingredient) {
		return axios.post('/shoppingList', ingredient)
	},
	deleteItem(ingredient) {
		return axios.delete('/shoppingList', ingredient)
	}
}
