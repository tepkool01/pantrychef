<template>
	<b-modal id="update-username" title="Update username">
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
	name: 'UpdateUsername'
}
</script>

<style scoped></style>
