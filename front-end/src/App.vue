<template>
	<div id="app">
		<a href="" @click="onLogout" v-if="isAuthenticated">Logout</a>
		<router-view />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'app',
	data() {
		return {}
	},
	computed: {
		...mapGetters('users', {
			isAuthenticated: 'isAuthenticated'
		})
	},
	methods: {
		...mapActions('users', {
			logout: 'logout'
		}),
		onLogout() {
			// Invalidate the session
			this.logout()

			// Navigate back to home page
			this.$router.replace('/')
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	background-color: #212b33;
	color: #889099;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

.input--error {
	border-color: red !important;
	border-width: medium !important;
}
</style>
