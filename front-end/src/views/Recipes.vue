<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Recipes</h1>
			</div>
		</div>
		<div class="row">
			Test
		</div>
	</div>
</template>

<script>
export default {
	name: 'Recipes',
	created() {
		this.$emit('title', 'Ingredients')
		this.$store.dispatch('recipes/getRecipes')
	}
}
</script>

<style scoped></style>
