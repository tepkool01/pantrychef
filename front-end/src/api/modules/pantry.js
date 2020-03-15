import axios from 'axios'

export default {
	getPantry(profile) {
		return axios.get('/pantry/' + profile)
	},
	addIngredient(profile_id, ingredient_id) {
		return axios.put('/pantry/' + profile_id + '/ingredients/' + ingredient_id)
	},
	deleteIngredient(profile_id, ingredient_id) {
		return axios.delete('/pantry/' + profile_id + '/ingredients/' + ingredient_id)
	}
}
