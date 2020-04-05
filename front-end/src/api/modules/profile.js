import axios from 'axios'
import store from '../../store';

export default {
	getProfiles() {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/profiles', config)
	},
	createProfile(profile) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.post('/profiles', profile, config)
	},
	deleteProfile(id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.delete('/profiles/' + id, config)
	},
	setActive(profile_id) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.put('/profiles/' + profile_id + '/activate', config)
	}
}
