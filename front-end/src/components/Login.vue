<template>
    <div class="login">
        <label>
            Username
            <input type="text" name="username" />
        </label>
        <label>
            Password
            <input type="password" name="password"/>
        </label>
    </div>
</template>

<script>
	export default {
		name: 'login',
		methods: {
			onSubmit() {
				return false
			}
		}
	}
</script>

<style scoped></style>
