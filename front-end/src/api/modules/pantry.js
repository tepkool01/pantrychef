import axios from 'axios'

export default {
	getPantry() {
		return axios.get('/pantry')
	}
}
