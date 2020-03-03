<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Ingredients</h1>
			</div>
		</div>
		<div class="row">
			This will be a listing of all the ingredients that we have in our tables
		</div>
	</div>
</template>

<script>
export default {
	name: 'Ingredients',
	created() {
		this.$emit('title', 'Ingredients')
	}
}
</script>

<style scoped></style>
