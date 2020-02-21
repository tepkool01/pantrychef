<template>
	<form>
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
				/>
			</div>
			<div class="form-group mb-3">
				<label>Diet Type</label>
				<select class="form-control" aria-label="Diet Type">
					<option hidden>-----</option>
					<option>No Preference</option>
					<option>Vegetarian</option>
					<option>Vegan</option>
					<option>Gluten Free</option>
					<option>Paleo</option>
				</select>
			</div>
		</div>
		<button
			@click="onSubmit"
			class="btn btn-primary btn-block button--register mt-2 mb-5"
		>
			Sign up
		</button>
	</form>
</template>

<script>
export default {
	name: 'register',
	data() {
		return {
			user: {
				fullName: '',
				username: '',
				email: '',
				password: '',
				repassword: '',
				dietType: ''
			}
		}
	},
	methods: {
		onSubmit() {
			this.$store
				.dispatch('createAccount', this.user)
				.then(() => {
					alert('REGISTERED')
				})
				.catch(err => {
					alert(err)
				})
		}
	}
}
</script>

<style scoped>
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
