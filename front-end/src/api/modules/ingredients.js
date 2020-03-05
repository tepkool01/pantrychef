import axios from 'axios'

export default {
	getIngredients() {
		return axios.get('/ingredients')
	},

	getIngredient(id) {
		return axios.get('/ingredients/' + id)
	}
}
