<template>
	<div class="create-profile d-flex justify-content-between">
		<input
			id="profile_create_name"
			type="text"
			name="profile-name"
			class="form-control"
			v-model="profile.name"
            placeholder="Profile Name"
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
import { EventBus } from '../eventBus';

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
				if (this.profile.name.length > 0) {
					this.createProfile(this.profile);
					this.profile = {
						name: '',
						ingredients: [],
					};
				} else {
					EventBus.setAlert('Error', 1, 'Profile name must have text.');
				}

			},
		},
	};
</script>

<style scoped></style>
