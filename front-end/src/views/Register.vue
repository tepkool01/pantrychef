<template>
	<div class="register vh-100">
		<div class="row">
			<div class="col-lg-5 register--photo-left"></div>
			<div class="col-lg-7 my-auto">
				<div class="row h-100">
					<div class="col-lg-4 offset-4">
						<div class="container">
							<h1>Join and Create</h1>
							<p class="mb-5">
								Already have an account?
								<router-link to="/">Login</router-link>
							</p>
							<register-form></register-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'

export default {
	name: 'register',
	components: {
		RegisterForm: RegisterForm
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
</style>
