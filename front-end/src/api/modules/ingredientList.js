import axios from 'axios'

export default {
	getIngredientLists() {
		return axios.get('/ingredientList')
	},

	getIngredientList(id) {
		return axios.get('/ingredientList/' + id)
	}
}