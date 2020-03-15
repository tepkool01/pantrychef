import axios from 'axios'

export default {
	getPantry() {
		return axios.get('/pantry')
	},
	getShopping() {
		console.log("calling shop")
		return axios.get('/shopping')
	}
}
