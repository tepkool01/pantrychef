import axios from 'axios'

export default {
	getProfiles() {
		return axios.get('/profiles')
	},
	createProfile(profile) {
		return axios.post('/profiles', profile)
	}
}
