<template>
	<div class="chef-profile">
		Name:{{ ingredients.IngredientName }} Type:{{ ingredients.IngredientType }}  Id:({{ ingredients.id }})
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
