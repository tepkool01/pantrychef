import axios from 'axios'

export default {
	getProfiles() {
		return axios.get('/profiles')
	},
	// eslint-disable-next-line no-unused-vars
	createProfile(profile) {
		return Promise.resolve()
	}
}
