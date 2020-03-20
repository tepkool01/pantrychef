<template>
	<b-modal id="update-password" title="Update your password" @ok="handleOk">
		<div>
			<div class="form-group">
				<label for="verify-password">Verify current password</label>
				<input
					class="form-check"
					name="verify-password"
					type="password"
					id="verify-password"
				/>
			</div>
			<div class="form-group">
				<label for="new-password">New password</label>
				<input
					class="form-check"
					name="password"
					type="password"
					id="new-password"
				/>
			</div>
			<div class="form-group">
				<label for="new-repassword">Confirm password</label>
				<input
					class="form-check"
					name="new-repassword"
					type="password"
					id="new-repassword"
				/>
			</div>
			<div class="form-group">
				<b-form-checkbox
					id="logout-everywhere"
					name="logout-everywhere"
				>
					Log me out everywhere
				</b-form-checkbox>
			</div>
		</div>
	</b-modal>
</template>

<script>
export default {
	name: 'UpdatePassword',
	methods: {
		// need to handle Ok first, THEN do all your submit actions
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			this.handleSubmit()
		},
		handleSubmit() {
			console.log('Do some validation, post/patch new password, etc...')
			// Manually hide modal
			this.$nextTick(() => {
				this.$bvModal.hide('update-password')
			})
		}
	}
}
</script>

<style scoped></style>
