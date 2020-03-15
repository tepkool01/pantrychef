import axios from 'axios'

export default {
	getPantry() {
		return axios.get('/pantry')
	},
	addItem(ingredient) {
		return axios.post('/pantry', ingredient)
	},
	deleteItem(ingredient) {
		return axios.delete('/pantry', ingredient)
	},
	getShoppingList() {
		return axios.get('/shopping-lists')
	}
}
