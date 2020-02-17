<template>
	<div>
		<!-- Page Content -->
		<div class="row">
			<div class="col-lg-5 landing__photo-left"></div>

			<div class="col-lg-7 text-center">
				<nav class="navbar navbar-expand-lg navbar-dark mt-4">
					<div class="container">
						<button
							class="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarResponsive"
							aria-controls="navbarResponsive"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span class="navbar-toggler-icon"></span>
						</button>
						<div
							class="collapse navbar-collapse"
							id="navbarResponsive"
						>
							<ul class="navbar-nav mx-auto">
								<li class="nav-item">
									<a class="nav-link" href="#">Home</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">About</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<div class="row">
					<div class="col-lg-6 offset-3">
						<h1 class="mt-5 landing__title">Pantry Chef</h1>
						<p class="mb-5">Sign-up and spark your recipe ideas.</p>

						<button
							class="btn btn-block btn-primary button__facebook-login"
						>
							Login with Facebook
						</button>
						<button
							class="btn btn-block btn-danger button__google-login"
						>
							Login with Google
						</button>

						<div>or</div>

						<div class="input-group mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="Username"
								aria-label="Username"
							/>
						</div>
						<div class="input-group mb-3">
							<input
								type="password"
								class="form-control"
								placeholder="Password"
								aria-label="Password"
							/>
						</div>

						<button class="btn btn-primary button__login mt-2 mb-5">
							Login
						</button>
					</div>
				</div>
			</div>

			<div class="row landing__photo-bottom">
				<div class="col-lg-12"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home'
}
</script>

<style scoped>
.landing__photo-left {
	background: transparent url('../assets/landing__photo-left.jpeg') no-repeat
		center center / cover;
}

.landing__photo-bottom {
	background: transparent url('../assets/landing__photo-bottom.jpeg')
		no-repeat center center / cover;
	/* Setting a default height for now for background to show*/
	height: 200px;
	width: 100%;
}

.button__google-login {
	background-color: #c4543b;
}

.button__facebook-login {
	background-color: #5296e7;
}

.button__login {
	background-color: #889099;
	border: #889099;
}
</style>
