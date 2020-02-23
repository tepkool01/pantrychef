<template>
	<div class="chef-profile">
		 {{ profile.profile_name }} ({{ profile.id }}) <a href="#" @click="onDelete">DELETE</a>
	</div>
</template>

<script>
export default {
	name: 'ChefProfile',
	props: {
		profile: Object
	},
	methods: {
		onDelete() {
			this.$store.dispatch('profile/deleteProfile', this.profile.id)
		}
	}
}
</script>

<style scoped></style>
