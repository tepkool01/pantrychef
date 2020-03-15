import axios from 'axios'

export default {
	getPantry() {
		return axios.get('/pantry')
	},
	getShoppingList() {
		return axios.get('/shoppingList')
	}
}
