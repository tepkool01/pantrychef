<template>
	<div class="register vh-100">
		<register-main></register-main>
	</div>
</template>

<script>
// @ is an alias to /src
import RegisterMain from '@/components/RegisterMain.vue'

export default {
	name: 'register',
	components: {
		RegisterMain
	}
}
</script>

<style scoped>
	.register {
		background: linear-gradient(
				rgba(255, 255, 255, 0.65),
				rgba(255, 255, 255, 0.65)
		), url('../assets/register__photo-background.jpg') no-repeat
		center center / cover;
	}
</style>
