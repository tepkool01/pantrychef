<template>
	<div class="chef-profile">
		Name:{{ ingredient.IngredientName }} Type:{{ ingredient.IngredientType }}  Id:({{ ingredient.id }})
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
