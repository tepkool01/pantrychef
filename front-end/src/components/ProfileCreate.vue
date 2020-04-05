<template>
	<div class="create-profile d-flex justify-content-between">
		Name:
		<input
			id="profile_create_name"
			type="text"
			name="profile-name"
			class="form-control"
			v-model="profile.name"
		/>

		<b-button variant="outline-secondary" class="ml-3" @click="onSubmit"
				  id="profile_create_button"
		>Create
		</b-button
		>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'ChefProfile',
		data() {
			return {
				profile: {
					name: '',
					ingredients: [],
				},
			};
		},
		methods: {
			...mapActions('profile', {
				createProfile: 'createProfile',
			}),
			onSubmit() {
				this.createProfile(this.profile)
				this.profile = {
					name: '',
					ingredients: [],
				};
			},
		},
	};
</script>

<style scoped></style>
