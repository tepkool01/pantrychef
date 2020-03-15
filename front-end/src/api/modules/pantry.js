import axios from 'axios'

export default {
	getPantry(profile) {
		return axios.get('/pantry/' + profile)
	},
	addIngredient(ingredient_id, profile_id) {
		console.log("Addinggggg")
		console.log(ingredient_id)
		console.log(profile_id)
		return axios.put('/pantry/' + profile_id + '/ingredients/' + ingredient_id)
	},
	deleteIngredient(ingredient_id, profile_id) {
		return axios.delete('/pantry/' + profile_id + '/ingredients/' + ingredient_id)
	}
}
