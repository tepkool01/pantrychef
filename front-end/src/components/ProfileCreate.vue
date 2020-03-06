<template>
	<div class="create-profile d-flex justify-content-between">
		<input
			type="text"
			name="profile-name"
			class="form-control"
			v-model="profile.name"
		/>

		<input
			type="text"
			name="organization-name"
			class="form-control"
			v-model="profile.organization"
		/>

		<b-button variant="outline-secondary" class="ml-3" @click="onSubmit"
			>Create</b-button
		>
	</div>
</template>

<script>
export default {
	name: 'ChefProfile',
	data() {
		return {
			profile: {
				name: '',
				ingredients: [],
				organization: ''
			}
		}
	},
	methods: {
		onSubmit() {
			this.$store.dispatch('profile/createProfile', this.profile)
			this.profile = {
				name: '',
				ingredients: [],
				organization: ''
			}
		}
	}
}
</script>

<style scoped></style>
