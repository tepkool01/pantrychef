<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h2 class="mt-3 mb-4">Account settings</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12 settings--section-label">
				Account preferences
			</div>
		</div>
		<div class="row mb-3">
			<div class="col-lg-12">
				<div class="form-group">
					<label for="username"
						>Update username
						<input
							type="text"
							name="username"
							id="username"
							class="form-control"
							:value="userId"
						/>
					</label>
					<b-button
						variant="outline-secondary"
						class="ml-3"
						@click="onSubmit"
						>Update</b-button
					>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<div class="form-group">
					<label for="password"
						>Update password
						<input
							type="text"
							name="password"
							id="password"
							class="form-control"
						/>
					</label>
					<b-button
						variant="outline-secondary"
						class="ml-3"
						@click="onSubmit"
						>Update</b-button
					>
				</div>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-lg-12 settings--section-label">
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
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'SettingsAccount',
	computed: {
		...mapGetters('users', {
			userId: 'userId'
		})
	}
}
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
