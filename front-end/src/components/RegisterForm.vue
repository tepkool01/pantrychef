<template>
	<form id="register" @submit="registerUser" method="post" :novalidate="true">
		<div class="register">
			<div class="form-group mb-3">
				<label for="full-name">Email</label>
				<input
					v-model="user.email"
					type="text"
					class="form-control"
					placeholder="bob@domain.com"
					aria-label="The Chef"
					id="email"
				/>
			</div>
			<div class="form-group mb-3">
				<label for="full-name">Full Name</label>
				<input
					v-model="user.fullName"
					type="text"
					class="form-control"
					placeholder="The Chef"
					aria-label="The Chef"
					id="full-name"
					autocomplete="name"
				/>
			</div>
			<div class="form-group mb-3">
				<label>Username</label>
				<input
					v-model="user.username"
					type="text"
					class="form-control"
					placeholder="Username"
					aria-label="Username"
					autocomplete="username"
                    id="username"
				/>
			</div>
			<div class="form-group mb-3">
				<label>Password</label>
				<input
					v-model="user.password"
					type="password"
					class="form-control"
					placeholder="Password"
					aria-label="Password"
					autocomplete="new-password"
                    id="password"
				/>
			</div>
			<div class="form-group mb-3">
				<label>Re-Enter Password</label>
				<input
					v-model="user.repassword"
					type="password"
					class="form-control"
					placeholder="Re-Enter Password"
					aria-label="Re-Enter Password"
					autocomplete="new-password"
                    id="repassword"
				/>
			</div>
		</div>
		<button class="btn btn-primary btn-block button--register mt-2 mb-5">
			Sign up
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
import { mapActions } from 'vuex';
export default {
	name: 'register',
	data() {
		return {
			regex: {
				email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
				passwordLowercase: /[a-z]/,
				passwordUppercase: /[A-Z]/,
				passwordNumbers: /[0-9]/,
			},
			user: {
				fullName: '',
				username: '',
				email: '',
				password: '',
				repassword: '',
				dietType: '',
			},
			validation: {
				errors: [],
				username: false,
				password: false,
				repassword: false,
				email: false,
				fullName: false,
			},
		};
	},
	methods: {
		// Validates the form, and provides error messaging if needed
		validateForm(e) {
			// Return the status of the form to the submission handler
			let isValid = true;

			// Prevents the form from doing its normal action of submitting it via HTML
			e.preventDefault();

			// Reset the form and do a check, in case they fixed anything in a previous submission
			this.resetForm();

			// Validate that they actually input something
			if (this.user.username.length === 0) {
				// Makes the 'input--error' class active, so we will get a red border
				this.validation.username = true;
				this.validation.errors.push({
					id: 1,
					msg: 'Username is required',
				});
				isValid = false;
			}
			if (this.user.password.length < 8) {
				this.validation.password = true;
				this.validation.errors.push({
					id: 2,
					msg: 'Password needs to be greater than 8 characters',
				});
				isValid = false;
			}
			if (this.user.email.length === 0) {
				this.validation.email = true;
				this.validation.errors.push({
					id: 3,
					msg: 'Email is required',
				});
				isValid = false;
			}
			if (this.user.fullName.length === 0) {
				this.validation.email = true;
				this.validation.errors.push({
					id: 4,
					msg: 'Full Name is required',
				});
				isValid = false;
			}

			// Verify that password matches password check
			if (this.user.password !== this.user.repassword) {
				this.validation.password = true;
				this.validation.repassword = true;
				this.validation.errors.push({
					id: 5,
					msg: 'Passwords do not match',
				});
				isValid = false;
			}

			if (
				!this.regex.passwordLowercase.test(this.user.password)
				|| !this.regex.passwordUppercase.test(this.user.password)
				|| !this.regex.passwordNumbers.test(this.user.password)
			) {
				this.validation.password = true;
				this.validation.errors.push({
					id: 6,
					msg:
						'Password must have at least 1 upper case character, lower case character, and number',
				});
				isValid = false;
			}

			if (!this.regex.email.test(this.user.email)) {
				this.validation.email = true;
				this.validation.errors.push({
					id: 7,
					msg: 'Email must be a valid address',
				});
				isValid = false;
			}

			return isValid;
		},
		resetForm() {
			this.validation.errors = [];
			this.validation.username = false;
			this.validation.password = false;
			this.validation.repassword = false;
			this.validation.email = false;
			this.validation.fullName = false;
		},
		registerUser(e) {
			if (this.validateForm(e)) {
				this.createAccount(this.user)
					.then(() => {
						this.$emit('successfulRegister', true);
					})
					.catch((err) => {
						this.validation.errors.push({
							id: 99,
							msg: err,
						});
					});
			}
		},
        ...mapActions('users', {
        	'createAccount': 'createAccount',
        }),
	},
};
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
.register {
	text-align: left;
}

.button--register {
	background-color: #889099;
	border: #889099;
}

.button--register:hover {
	background-color: #717880;
	transition: 0.3s;
}
</style>
