<template>
	<b-modal
		id="update-password"
		title="Update your password"
		@ok="UpdatePassword"
	>
		<div>
			<label>{{user.username}}</label>
			<div class="form-group">
				<label for="verify-password">Verify current password</label>
				<input
						v-model="user.oldpassword"
					class="form-check"
					name="verify-password"
					type="password"
					id="verify-password"
				/>
			</div>
			<div class="form-group">
				<label for="new-password">New password</label>
				<input
						v-model="user.password"
					class="form-check"
					name="password"
					type="password"
					id="new-password"
				/>
			</div>
			<div class="form-group">
				<label for="new-repassword">Confirm password</label>
				<input
						v-model="user.repassword"
					class="form-check"
					name="new-repassword"
					type="password"
					id="new-repassword"
				/>
			</div>
		</div>
		<div v-if="validation.errors.length > 0" class="error-box my-2 py-3">
			<ul>
				<li v-for="error in validation.errors" :key="error.id">
					{{ error.msg }}
				</li>
			</ul>
		</div>
	</b-modal>
</template>

<script>
export default {
	name: 'UpdatePassword',
	methods: {
		// need to handle Ok first, THEN do all your submit actions
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			this.handleSubmit()
		},
		handleSubmit() {
			console.log('Do some validation, post/patch new password, etc...')
			// Manually hide modal
			this.$nextTick(() => {
				this.$bvModal.hide('update-password')
			})
		}
	},
	data() {
		return {
			regex: {
				passwordLowercase: /[a-z]/,
				passwordUppercase: /[A-Z]/,
				passwordNumbers: /[0-9]/
			},
			user: {
				username: '',
				oldpassword: '',
				password: '',
				repassword: ''
			},
			validation: {
				errors: [],
				oldpassword: false,
				password: false,
				repassword: false
			}
		}
	},
	methods: {
		// Validates the username, password, password confirmation, etc, and provides error messaging if needed
		validateForm(e) {
			// Return the status of the form to the submission handler
			let isValid = true
			console.log("Continue Here.")
			// Prevents the form from doing its normal action of submitting it via HTML, we will handle submission
			e.preventDefault()
			console.log("prevent Closing")

			// Reset the form and do a check, in case they fixed anything in a previous submission
			this.resetForm()
			console.log("Reset Form")
			if (this.user.oldpassword.length < 8) {
				this.validation.oldpassword = true
				this.validation.errors.push({
					id: 2,
					msg: 'Please input your current valid password'
				})
				isValid = false
			}
			console.log("First Test:"+isValid)
			if (this.user.password.length < 8) {
				this.validation.password = true
				this.validation.errors.push({
					id: 2,
					msg: 'Your new password needs to be greater than 8 characters'
				})
				isValid = false
			}
			console.log("Second Test:"+isValid)
			// Verify that password matches password check
			if (this.user.password !== this.user.repassword) {
				this.validation.password = true
				this.validation.repassword = true
				this.validation.errors.push({
					id: 5,
					msg: 'Passwords do not match'
				})
				isValid = false
			}
			console.log("Third Test:"+isValid)

			if (
				!this.regex.passwordLowercase.test(this.user.password) ||
				!this.regex.passwordUppercase.test(this.user.password) ||
				!this.regex.passwordNumbers.test(this.user.password)
			) {
				this.validation.password = true
				this.validation.errors.push({
					id: 6,
					msg:
						'Password must have at least 1 upper case character, lower case character, and number'
				})
				isValid = false
			}

			return isValid
		},
		resetForm() {
			this.validation.errors = []
			this.validation.oldpassword = false
			this.validation.password = false
			this.validation.repassword = false
		},
		UpdatePassword(e) {
			console.log("Start here.")
			if (this.validateForm(e)) {
				console.log("Form Validated")
				this.$store
					.dispatch('users/updatePassword', this.user)
					.then(() => {
						// This is a really cool method, it allows you to talk back to the parent view or component, in this case
						// Register.vue, it will send back data to the parent (in this case, just a true value), and then the parent
						// can make a decision on what to do. This is similar to 'props' (passing data from parent to child), just reversed
						this.$emit('successfulPasswordChange', true)
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

<style scoped></style>
