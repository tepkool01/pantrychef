<template>
	<div class="row">
		<div class="col-lg-5 register--photo-left"></div>
		<div class="col-lg-7 my-auto">
			<div class="row h-100">
				<div class="col-lg-4 offset-4">
					<div class="container">
						<h1>Join and Create</h1>
						<div class="register">
							<div class="form-group mb-3">
								<label for="full-name">Full Name</label>
								<input
										type="text"
										class="form-control"
										placeholder="The Chef"
										aria-label="The Chef"
										id="full-name"
								/>
							</div>
							<div class="form-group mb-3">
								<label for="username">Username</label>
								<input
										type="text"
										class="form-control"
										placeholder="Username"
										aria-label="Username"
										id="username"
								/>
							</div>
							<div class="form-group mb-3">
								<label for="password">Password</label>
								<input
										type="text"
										class="form-control"
										placeholder="Password"
										aria-label="Password"
										id="password"
								/>
							</div>
							<div class="form-group mb-3">
								<label for="password-verification">Re-Enter Password</label>
								<input
										type="text"
										class="form-control"
										placeholder="Re-Enter Password"
										aria-label="Re-Enter Password"
										id="password-verification"
								/>
							</div>
							<div class="form-group mb-3">
								<label for="diet-type">Diet Type</label>
								<select class="form-control" id="diet-type" aria-label="Diet Type">
									<option hidden>-----</option>
									<option>No Preference</option>
									<option>Vegetarian</option>
									<option>Vegan</option>
									<option>Gluten Free</option>
									<option>Paleo</option>
								</select>
							</div>
						</div>
						<button @click="onSubmit" class="btn btn-primary btn-block button--register mt-2 mb-5">Sign up</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	name: 'register',
	methods: {
		onSubmit() {
			return false
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
