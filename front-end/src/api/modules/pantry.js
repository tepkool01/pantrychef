import axios from 'axios'

export default {
	getPantry(profile) {
		return axios.get('/pantry', profile)
	},
	addItem(ingredient) {
		return axios.post('/pantry', ingredient)
	},
	deleteItem(ingredient) {
		return axios.delete('/pantry', ingredient)
	}
}
