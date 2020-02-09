<template>
	<div class="register">
		<h1>Register</h1>
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
