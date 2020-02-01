export default {
	getProfiles() {
		// Todo: make API call to users
		return [{ name: 'TestProfile 1' }, { name: 'TestProfile 1' }]
	},

	createProfile(profile) {
		console.log("I'ved been called!" + profile)
		return Promise.resolve()
	}
}
