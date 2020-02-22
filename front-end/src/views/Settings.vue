<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Settings</h1>
			</div>
		</div>
		<div class="row">
			Test
		</div>
	</div>
</template>

<script>
export default {
	name: 'Settings',
	created() {
		this.$emit('title', 'Ingredients')
	}
}
</script>

<style scoped>
</style>
