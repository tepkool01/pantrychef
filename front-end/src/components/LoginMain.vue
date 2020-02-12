<template>
	<div class="login-main">
		<label>
			Username
			<input type="text" name="login-username" v-model="login.username"/>
		</label>
		<label>
			Password
			<input type="password" name="login-password" v-model="login.password" />
		</label>
		<button @click="loginUser">Login</button>
	</div>
</template>

<script>
export default {
	name: 'Login-Main',
	data() {
		return {
			login: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		loginUser() {
			this.$store.dispatch('login', this.login)
		}
	}
}
</script>

<style scoped></style>
