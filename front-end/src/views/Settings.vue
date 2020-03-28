<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Settings</h1>
			</div>
		</div>
		<div class="container settings--page-content">
			<b-tabs content-class="mt-3">
				<!-- START: Account Settings tab -->
				<b-tab title="Account" active id="settings_account_tab">
					<settings-account></settings-account>
				</b-tab>
				<!-- END: Account settings tab-->

				<!-- START: Profile settings tab -->
				<b-tab title="Profiles" id="settings_profile_tab">
					<settings-profiles></settings-profiles>
				</b-tab>
				<!-- END: Profile settings tab -->

				<!-- START: Food Preferences Tab -->
				<b-tab title="Food Preferences" id="settings_preferences_tab">
					<settings-food></settings-food>
				</b-tab>
				<!-- END: Food preferences tab -->
			</b-tabs>
		</div>
	</div>
</template>

<script>
import SettingsAccount from '../components/SettingsAccount'
import SettingsProfiles from '../components/SettingsProfiles'
import SettingsFood from '../components/SettingsFood'
export default {
	name: 'Settings',
	components: {
		SettingsFood,
		SettingsProfiles,
		SettingsAccount
	},
	created() {
		this.$emit('title', 'Settings')
	}
}
</script>

<style scoped>
.settings--page-content {
	text-align: left;
}
</style>
