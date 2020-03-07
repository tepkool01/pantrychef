<template>
	<div class="chef-ingredient">
		[{{ ingredient.ingredient_type }}] {{ ingredient.ingredient_name }}   ({{ ingredient.id }})
	</div>
</template>

<script>
	export default {
		name: 'Ingredient',
		props: {
			ingredient: Object
		}
	}
</script>

<style scoped></style>
