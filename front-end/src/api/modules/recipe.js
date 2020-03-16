import axios from 'axios'

export default {
	getRecipes() {
		return axios.get('/recipes')
	},
	getIngredients(recipe_id) {
		return axios.get('/recipes/' + recipe_id + '/ingredients')
	},
	// eslint-disable-next-line no-unused-vars
	getRecipe(recipe) {
		return Promise.resolve()
	}
}
