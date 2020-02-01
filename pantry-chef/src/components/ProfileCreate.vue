<template>
	<div class="create-profile">
		<label>
			<input type="text" name="profile-name" v-model="profile.name" />
		</label>
		<button @click="onSubmit">Create</button>
	</div>
</template>

<script>
export default {
	name: 'ChefProfile',
	data() {
		return {
			profile: {
				name: '',
				ingredients: []
			}
		}
	},
	methods: {
		onSubmit() {
			console.log('Profile: ' + this.profile.name + ' created!')
			this.$store.dispatch('createProfile', this.profile)
			this.profile = {
				name: '',
				ingredients: []
			}
		}
	}
}
</script>

<style scoped></style>
