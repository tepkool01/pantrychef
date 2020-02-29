<template>
	<form
		id="forgotPasswordVerification"
		@submit="forgotPasswordVerificationSubmit"
		method="post"
		:novalidate="true"
	>
		<div class="forgotPasswordVerification">
			<div class="form-group mb-3">

				<label>Verification Code</label>
				<input
					v-model="user.code"
					type="text"
					class="form-control"
					placeholder="Username"
					aria-label="Username"
					autocomplete="username"
				/>
				<label>New Password</label>
				<input
					v-model="user.newPassword"
					type="text"
					class="form-control"
					placeholder="Username"
					aria-label="Username"
					autocomplete="username"
				/>
			</div>
		</div>
		<button class="btn btn-primary btn-block button--login mt-2 mb-5">
			Reset Password
		</button>
		<!-- Error validation block -->
		<div v-if="validation.errors.length > 0" class="error-box my-2 py-3">
			<ul>
				<li v-for="error in validation.errors" :key="error.id">
					{{ error.msg }}
				</li>
			</ul>
		</div>

	</form>
</template>

<script>
export default {
	name: 'forgotPassword',
	data() {
		return {
			regex: {
				email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
				passwordLowercase: /[a-z]/,
				passwordUppercase: /[A-Z]/,
				passwordNumbers: /[0-9]/
			},
			user: {
				code: '',
				newPassword: ''
			},
			validation: {
				errors: [],
				code: false,
				newPassword: false
			}
		}
	},
	methods: {
		// Validates the username, password, password confirmation, etc, and provides error messaging if needed
		validateForm(e) {
			// Return the status of the form to the submission handler
			let isValid = true

			// Prevents the form from doing its normal action of submitting it via HTML, we will handle submission
			e.preventDefault()

			// Reset the form and do a check, in case they fixed anything in a previous submission
			this.resetForm()

			// Validate that they actually input something
			if (this.user.username.length === 0) {
				// Makes the 'input--error' class active, so we will get a red border
				this.validation.username = true
				this.validation.errors.push({
					id: 1,
					msg: 'Username is required'
				})
				isValid = false
			}
			return isValid
		},
		resetForm() {
			this.validation.errors = []
			this.validation.username = false
		},
		forgotPasswordVerificationSubmit(e) {
			if (this.validateForm(e)) {
				this.$store
					.dispatch('users/forgotPasswordVerification', this.user)
					.then(() => {
						// See Micheal Young's notes on this method under register
						// Hint: he likes it.
						this.$emit('Successful Reset Password', true)
					})
					.catch(err => {
						this.validation.errors.push({
							id: 0,
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
	border-radius: 6px;
}
.form-control:focus {
	box-shadow: none;
}
.login {
	text-align: left;
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
