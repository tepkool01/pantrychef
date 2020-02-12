export default {
	getProfiles() {
		// Todo: make API call to users
		return [{ name: 'TestProfile 1' }, { name: 'TestProfile 1' }]
	},
	// eslint-disable-next-line no-unused-vars
	createProfile(profile) {
		return Promise.resolve()
	}
}
