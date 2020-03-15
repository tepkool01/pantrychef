import axios from 'axios'

export default {
	getPantry(profile) {
		return axios.get('/pantry/' + profile)
	},
	addIngredient(ingredient_id, profile_id) {
		return axios.put('/pantry/' + profile_id + '/ingredients/' + ingredient_id)
	},
	deleteIngredient(ingredient_id, profile_id) {
		return axios.delete('/pantry/' + profile_id + '/ingredients/' + ingredient_id)
	}
}
