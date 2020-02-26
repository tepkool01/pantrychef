<template>
	<div class="login">
		<!-- Page Content -->
		<div class="row min-vh-100">
			<div class="col-lg-6 landing__photo-left d-none d-md-block"></div>

			<div class="col-lg-6 text-center my-auto">
				<login></login>
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

.login {
	background-color: #212b33;
}
</style>
