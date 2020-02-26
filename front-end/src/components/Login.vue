<template>
	<div class="container">
		<h1 class="mt-5 landing__title">Pantry Chef</h1>
		<p class="mb-2">Spark your recipe ideas.</p>
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

		<div class="login--separator my-4"><span>or</span></div>

		<form id="login" @submit="loginUser" method="post" :novalidate="true">
			<div class="input-group mb-3">
				<input
					v-model="login.username"
					type="text"
					class="form-control"
					:class="{ 'input--error': validation.username }"
					placeholder="Username"
					aria-label="Username"
					autocomplete="username"
				/>
			</div>
			<div class="input-group mb-3">
				<input
					v-model="login.password"
					type="password"
					class="form-control"
					:class="{ 'input--error': validation.password }"
					placeholder="Password"
					aria-label="Password"
					autocomplete="current-password"
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
		</form>

		<!-- Error validation block -->
		<div v-if="validation.errors.length > 0" class="error-box">
			<ul>
				<li v-for="error in validation.errors" :key="error.id">
					{{ error.msg }}
				</li>
			</ul>
		</div>

		<p class="mb-6">
			<router-link to="/ForgotPassword">Forgot Password?</router-link>
		</p>
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
			},
			validation: {
				errors: [],
				username: false,
				password: false
			}
		}
	},
	methods: {
		// Validates the user name and password, and provides error messaging if needed
		validateForm(e) {
			// Return the status of the form to the submission handler
			let isValid = true

			// Prevents the form from doing its normal action of submitting it via HTML, we will handle submission
			e.preventDefault()

			// Reset the form and do a check, in case they fixed anything in a previous submission
			this.resetForm()

			// Validate that they actually input something
			if (this.login.username.length === 0) {
				// Makes the 'input--error' class active, so we will get a red border
				this.validation.username = true
				this.validation.errors.push({
					id: 1,
					msg: 'Username is required'
				})
				isValid = false
			}
			if (this.login.password.length === 0) {
				this.validation.password = true
				this.validation.errors.push({
					id: 2,
					msg: 'Password is required'
				})
				isValid = false
			}
			return isValid
		},
		resetForm() {
			this.validation.errors = []
			this.validation.username = false
			this.validation.password = false
		},
		// The parameter (e) is the event of the form, which is secretly passed in, and we capture it here to pass to
		// validate form
		loginUser(e) {
			if (this.validateForm(e)) {
				// initiate call to the store module for state changes/api request to validate user
				this.$store
					.dispatch('users/login', this.login)
					.then(() => {
						this.$router.replace('/pantry')
					})
					.catch(err => {
						this.validation.errors.push({
							id: 3,
							msg: err
						})
					})
			}
		}
	}
}
</script>

<style scoped>
.error-box {
	border: 1px solid red;
	text-align: left;
	padding-top: 10px;
}
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

.container {
	max-width: 60%;
}

.login--separator {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid #889099;
	line-height: 0.1em;
}

.login--separator span {
	padding: 0 10px;
	background-color: #212b33;
}
</style>
