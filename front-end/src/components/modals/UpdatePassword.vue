<template>
	<b-modal
		id="update-password"
		title="Update your password"
		@ok="UpdatePassword"
	>
		<div>
			<div class="form-group">
				<label id="update_password_modal_verify_input" for="verify-password">Verify current password</label>
				<input
						v-model="user.oldpassword"
					class="form-check"
					name="verify-password"
					type="password"
					id="verify-password"
                        autocomplete="off"
				/>
			</div>
			<div class="form-group">
				<label id="update_password_modal_password_input" for="new-password">New password</label>
				<input
						v-model="user.password"
					class="form-check"
					name="password"
					type="password"
					id="new-password"
                        autocomplete="off"
				/>
			</div>
			<div class="form-group">
				<label id="update_password_modal_repassword_input" for="new-repassword">Confirm password</label>
				<input
						v-model="user.repassword"
					class="form-check"
					name="new-repassword"
					type="password"
					id="new-repassword"
                        autocomplete="off"
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
import { EventBus } from '../../eventBus'; // used for Errors
import {mapGetters} from "vuex";

export default {
	name: 'UpdatePassword',
	computed: {
		...mapGetters('users', {
			userId: 'userId'
		})
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
			},
			users: 'userid'
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

			if (this.user.oldpassword.length < 8) {
				this.validation.oldpassword = true
				this.validation.errors.push({
					id: 2,
					msg: 'Please input your current valid password'
				})
				isValid = false
			}

			if (this.user.password.length < 8) {
				this.validation.password = true
				this.validation.errors.push({
					id: 2,
					msg: 'Your new password needs to be greater than 8 characters'
				})
				isValid = false
			}

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
			if (this.validateForm(e)) {
				this.$store
					.dispatch('users/UpdatePassword', {
						newPassword: this.user.password,
                        oldPassword: this.user.oldpassword
					})
					.then(() => {
						this.$bvModal.hide('update-password');
						EventBus.setAlert('Info', 1, 'Password changed successfully. Please use the updated password upon next login.');
					})
					.catch(err => {
						this.validation.errors.push({
							id: 0,
							msg: err
						})
					})
			}
		}
	},
}
</script>

<style scoped></style>
