<template>
    <div class="register">
        <label>
            Username
            <input type="text" name="username" />
        </label>
        <label>
            Password
            <input type="password" name="password"/>
        </label>
        <label>
            Email
            <input type="email" name="email"/>
        </label>
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

<style scoped></style>
