<template>
	<div class="create-profile">
		<div class="form-group">
			<label>
				<input type="text" name="profile-name" class="form-control" v-model="profile.name" />
			</label>
		</div>
		<button class="btn btn-dark" @click="onSubmit">Create</button>
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
