<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h2 class="mt-3 mb-4">Profile Settings</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-8 settings--section-label">
				Manage Profiles
			</div>
		</div>
		<div class="row">
			<b-list-group class="col-lg-8" id="profile_list">
				<b-list-group-item
					class="d-flex justify-content-between align-items-center"
					v-for="p in profiles"
					v-bind:key="p.value"
					:id="'profile_item_' + p.value"
				>
					{{ p.text }}
					<b-button-group>
						<b-button
							:id="'profile_delete_' + p.value"
							variant="outline-secondary"
						>
							<b-icon-trash
								@click="onDelete(p.value)"
							></b-icon-trash>
						</b-button>
					</b-button-group>
				</b-list-group-item>
			</b-list-group>
		</div>
		<div class="row mt-4">
			<div class="col-lg-8 settings--section-label">
				Add Profile
			</div>
		</div>
		<div class="row">
			<div class="col-lg-8 d-flex align-items-start">
				<profile-create></profile-create>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileCreate from './ProfileCreate.vue';

export default {
	name: 'SettingsProfiles',
	computed: {
		...mapGetters('profile', {
			profiles: 'profiles',
		}),
		...mapGetters('users', {
			isAuthenticated: 'isAuthenticated',
		}),
	},
	components: {
		ProfileCreate,
	},
	methods: {
		onDelete(id) {
			this.$store.dispatch('profile/deleteProfile', id);
		},
		...mapActions('profile', {
			getProfiles: 'getProfiles',
		}),
	},
	created() {
		if (this.isAuthenticated) {
			this.getProfiles();
		}
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
</style>
