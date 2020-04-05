<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h2 class="mt-3 mb-4">Account settings</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-8 settings--section-label">
				Account preferences
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-lg-8 d-flex justify-content-between">
				<div>
					<div class="settings--content-label">Update username</div>
					<div class="settings--content-sublabel">{{ userId }}</div>
				</div>
				<div>
					<b-button
						variant="outline-secondary"
						class="ml-3"
						v-b-modal="'update-username'"
						>Update</b-button
					>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-8 d-flex justify-content-between">
				<div>
					<div class="settings--content-label">Update password</div>
					<div class="settings--content-sublabel">
						Password must be at least 6 characters long
					</div>
				</div>
				<div>
					<b-button
						variant="outline-secondary"
						id="update_password_button"
						class="ml-3"
						v-b-modal="'update-password'"
						>Update</b-button
					>
				</div>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-lg-8 settings--section-label">
				Deactivate account
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6"></div>
			<div class="col-lg-6">
				<button class="btn btn-outline-danger">
					<b-icon-trash></b-icon-trash> Deactivate account
				</button>
			</div>
		</div>
		<update-password></update-password>
		<update-username></update-username>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import UpdatePassword from './modals/UpdatePassword.vue';
import UpdateUsername from './modals/UpdateUsername.vue';

export default {
	name: 'SettingsAccount',
	components: { UpdateUsername, UpdatePassword },
	computed: {
		...mapGetters('users', {
			userId: 'userId',
		}),
	},
};
</script>

<style scoped>
.settings--section-label {
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.5px;
	line-height: 12px;
	text-transform: uppercase;
	border-bottom: 2px solid #edeff1;
	color: #7c7c7c;
	margin-bottom: 32px;
	padding-bottom: 6px;
}

.settings--content-label {
	font-size: 16px;
	font-weight: 500;
	line-height: 20px;
	margin-bottom: 4px;
}

.settings--content-sublabel {
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
}
</style>
