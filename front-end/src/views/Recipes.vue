<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Recipes</h1>
			</div>
		</div>
		<div class="row">
			<recipe-card></recipe-card>
		</div>
	</div>
</template>

<script>
import RecipeCard from '../components/RecipeCard'
import ViewRecipe from './ViewRecipe'
export default {
	name: 'Recipes',
	components: {
		RecipeCard,
	    ViewRecipe
	},
	created() {
		this.$emit('title', 'Ingredients')
		this.$store.dispatch('recipes/getRecipes')
	}
}
</script>

<style scoped></style>
