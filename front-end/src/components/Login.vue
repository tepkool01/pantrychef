<template>
	<div class="col-lg-4 offset-4">
		<div class="container">
			<h1 class="mt-5 landing__title">Pantry Chef</h1>
			<p class="mb-2">Sign-up and spark your recipe ideas.</p>
			<p class="mb-5">
				New to Pantry Chef?
				<router-link to="/register">Sign up</router-link>
			</p>

			<button class="btn btn-block btn-primary button--facebook-login">
				Login with Facebook
			</button>
			<button class="btn btn-block btn-danger button--google-login">
				Login with Google
			</button>

			<div>or</div>

			<div class="input-group mb-3">
				<input
					v-model="login.username"
					type="text"
					class="form-control"
					placeholder="Username"
					aria-label="Username"
				/>
			</div>
			<div class="input-group mb-3">
				<input
					v-model="login.password"
					type="password"
					class="form-control"
					placeholder="Password"
					aria-label="Password"
				/>
			</div>

			<div class="mt-2 mb-5">
				<button
					@click="loginUser"
					class="btn btn-primary btn-block button--login"
				>
					Login
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
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
			// initiate call to the store module for state changes/api request to validate user
			this.$store
				.dispatch('login', this.login)
				.then(() => {
					alert('LOGGED IN')
					this.$router.replace('/profiles')
				})
				.catch(err => {
					alert(err)
				})
		}
	}
}
</script>

<style scoped>
.button--google-login {
	background-color: #c4543b;
}

.button--google-login:hover {
	background-color: #cc573d;
	transition: 0.3s;
}

.button--facebook-login {
	background-color: #3b5998;
	border: #3b5998;
}

.button--facebook-login:hover {
	background-color: #5077cc;
	transition: 0.3s;
}

.button--login {
	background-color: #889099;
	border: #889099;
}

.button--login:hover {
	background-color: #717880;
	transition: 0.3s;
}
</style>
