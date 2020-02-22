import axios from 'axios'

export default {
	getRecipes() {
		return axios.get('/recipes')
	},
	// eslint-disable-next-line no-unused-vars
	getRecipe(recipe) {
		return Promise.resolve()
	}
}
