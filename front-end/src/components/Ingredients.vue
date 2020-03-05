<template>
	<div class="chef-profile">
		{{ ingredients.IngredientName }} {{ ingredients.IngredientType }}  ({{ ingredients.id }})
	</div>
</template>

<script>
export default {
	name: 'Ingredients',
	props: {
		ingredients: Object
	}
}
</script>

<style scoped></style>
