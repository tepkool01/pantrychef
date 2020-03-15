import axios from 'axios'

export default {
	getProfiles() {
		return axios.get('/profiles')
	},
	createProfile(profile) {
		return axios.post('/profiles', profile)
	},
	deleteProfile(id) {
		return axios.delete('/profiles/' + id)
	},
	setActive(profile_id) {
		return axios.put('/profiles/' + profile_id + '/activate')
	}
}
