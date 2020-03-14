import axios from 'axios'

export default {
	getShoppingList() {
		return axios.get('/shoppingList')
	}
}
