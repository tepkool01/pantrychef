<template>
	<div>
		<!-- Page Content -->
		<div class="row">
			<div class="col-lg-6 landing__photo-left"></div>

			<div class="col-lg-6 text-center">
				<!--				<nav class="navbar navbar-expand-lg navbar-dark mt-4">-->
				<!--					<div class="container">-->
				<!--						<button-->
				<!--							class="navbar-toggler"-->
				<!--							type="button"-->
				<!--							data-toggle="collapse"-->
				<!--							data-target="#navbarResponsive"-->
				<!--							aria-controls="navbarResponsive"-->
				<!--							aria-expanded="false"-->
				<!--							aria-label="Toggle navigation"-->
				<!--						>-->
				<!--							<span class="navbar-toggler-icon"></span>-->
				<!--						</button>-->
				<!--						<div-->
				<!--							class="collapse navbar-collapse"-->
				<!--							id="navbarResponsive"-->
				<!--						>-->
				<!--							<ul class="navbar-nav mx-auto">-->
				<!--								<li class="nav-item">-->
				<!--									<a class="nav-link" href="#">Home</a>-->
				<!--								</li>-->
				<!--								<li class="nav-item">-->
				<!--									<a class="nav-link" href="#">About</a>-->
				<!--								</li>-->
				<!--								<li class="nav-item">-->
				<!--									<a class="nav-link" href="#">Contact</a>-->
				<!--								</li>-->
				<!--							</ul>-->
				<!--						</div>-->
				<!--					</div>-->
				<!--				</nav>-->
				<login></login>
			</div>

			<div class="row landing__photo-bottom">
				<div class="min-vh-100"></div>
			</div>
		</div>
	</div>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
	name: 'home',
	components: {
		Login
	},
	created() {
		this.$emit('title', 'Home')
	}
}
</script>

<style scoped>
.landing__photo-left {
	background: linear-gradient(rgba(53, 56, 60, 0.55), rgba(53, 56, 60, 0.55)),
		url('../assets/landing__photo-left.jpeg') no-repeat center center /
			cover;
}

/* Overriding the default padding from bootstrap columns and row*/
.col-lg-7 {
	padding: 0;
}
.row {
	margin: 0;
}
</style>
