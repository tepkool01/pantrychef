<template>
	<div class="register">
		<!-- Page Content -->
		<div class="row min-vh-100">
			<div class="col-lg-6 register--photo-left d-none d-md-block"></div>

			<div class="col-lg-6 text-center my-auto">
				<div class="container">
					<h1>Join and Create</h1>
					<p class="mb-5">
						Already have an account?
						<router-link to="/">Login</router-link>
					</p>

					<register-form
						@successfulRegister="showSuccessComponent"
						v-if="!showSuccessPage"
					></register-form>
					<register-success v-else></register-success>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'
import RegisterSuccess from '@/components/RegisterSuccess.vue'

export default {
	name: 'register',
	components: {
		RegisterForm: RegisterForm,
		RegisterSuccess: RegisterSuccess
	},
	data() {
		return {
			showSuccessPage: false
		}
	},
	methods: {
		showSuccessComponent(data) {
			// Received success message from register, so hide the register component and show the success page
			this.showSuccessPage = data
		}
	},
	created() {
		this.$emit('title', 'Register')
	}
}
</script>

<style scoped>
.register {
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
