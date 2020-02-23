<template>
	<div class="chef-profile">
		 {{ profile.profile_name }} ({{ profile.id }})
	</div>
</template>

<script>
export default {
	name: 'ChefProfile',
	props: {
		profile: Object
	}
}
</script>

<style scoped></style>
