<template>
	<div class="login">
		<h1>Pantry</h1>
		<h3>Welcome {{ userId }}!</h3>
		<br /><br /><br />
		<h2>Create a Profile</h2>
		<profile-create></profile-create>

		<h2>Select an existing profile</h2>
		<div v-for="p in profiles" v-bind:key="p.name">
			<profile :profile="p"></profile>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/Profile.vue'
import ProfileCreate from '../components/ProfileCreate'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Profiles',
	computed: {
		...mapGetters('users', {
			userId: 'userId'
		}),
		...mapGetters('profile', {
			profiles: 'profiles'
		})
	},
	components: {
		Profile,
		ProfileCreate
	},
	methods: {
		...mapActions('profile', {
			getProfiles: 'getProfiles'
		})
	},
	created() {
		this.getProfiles()
	}
}
</script>
