<template>
	<div class="forgotPassword">
		<!-- Page Content -->
		<div class="row min-vh-100">
			<div class="col-lg-6 register--photo-left d-none d-md-block"></div>

			<div class="col-lg-6 text-center my-auto">
				<div class="container">
					<h1>Forgot your password?</h1>
					<forgotPassword-form
						@passwordVerification="showVerificationComponent"
						v-if="!showSuccessPage && !showVerificationPage"
					></forgotPassword-form>
					<forgotPassword-verification-form
						@successfulVerification="showSuccessComponent"
						v-else-if="showVerificationPage && !showSuccessPage"
					>	</forgotPassword-verification-form>
					<forgotPassword-success v-else></forgotPassword-success>
					<div
						v-if="!showSuccessPage"
					><p class="mb-5">
						Don't want to change your password?
						<router-link to="/">Go Back</router-link>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'
import ForgotPasswordVerificationForm from '@/components/ForgotPasswordVerificationForm.vue'
import ForgotPasswordSuccess from '@/components/ForgotPasswordSuccess.vue'

export default {
	name: 'forgotPassword',
	components: {
		ForgotPasswordForm: ForgotPasswordForm,
		ForgotPasswordVerificationForm: ForgotPasswordVerificationForm,
		ForgotPasswordSuccess: ForgotPasswordSuccess
	},
	data() {
		return {
			showSuccessPage: false,
			showVerificationPage: false
		}
	},
	methods: {
		showVerificationComponent(data) {
			console.log('Verification:'+data)
			this.showVerificationPage = data
		},
		showSuccessComponent(data) {
			// Received success message from cognito forgot password, so hide the form component and show the success page
			console.log('Success:'+data)
			this.showSuccessPage = data
		}
	},
	created() {
		this.$emit('title', 'ForgotPassword')
	}
}
</script>

<style scoped>
.forgotPassword {
	background: linear-gradient(
			rgba(255, 255, 255, 0.65),
			rgba(255, 255, 255, 0.65)
		),
		url('../assets/register__photo-background.jpg') no-repeat center center /
			cover;
}
/* Overriding the default padding from bootstrap columns and row*/
.col-lg-7 {
	padding: 0;
}
.row {
	margin: 0;
}

.container {
	max-width: 60%;
}
</style>
