<template>
	<b-modal id="update-username" title="Update username" @ok="handleOk">
		<div>
			<div class="form-group">
				<label for="verify-password">Verify current password</label>
				<input
					class="form-check"
					name="verify-password"
					type="password"
				/>
			</div>
			<div class="form-group">
				<label for="username">New username</label>
				<input class="form-check" name="username" type="text" />
			</div>
		</div>
	</b-modal>
</template>

<script>
export default {
	name: 'UpdateUsername',
	methods: {
		// need to handle Ok first, THEN do all your submit actions
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			this.handleSubmit()
		},
		handleSubmit() {
			// Manually hide modal
			this.$nextTick(() => {
				this.$bvModal.hide('update-username')
			})
		}
	}
}
</script>

<style scoped></style>
