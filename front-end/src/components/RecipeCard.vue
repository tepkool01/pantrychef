<template>
	<div class="card recipe-card m-3">
		<div class="card-header recipe-card--header d-flex justify-content-between">
			<h4 class="recipe-card--title">{{recipe.recipe_name}}</h4>
			<button class="btn btn-sm btn-light active">
				<template v-if="recipe.ingredients_in_pantry ===  recipe.ingredient_count">
				<b-icon-check></b-icon-check>
				All Ingredients Present
				</template>

				<template v-else>{{ recipe.ingredients_in_pantry }} of {{ recipe.ingredient_count }} ingredients ({{parseFloat(recipe.match_percent) * 100}}% Match) </template>
			</button>
		</div>
		<div class="card-body">
			<div class="row no-gutters">
				<div class="col-lg-3">
					<img src="https://placekitten.com/150/150" />
				</div>
				<div class="col-lg-9 recipe-card--body d-flex align-items-start flex-column">
					<div class="recipe-card--description">
						We don't have a description, possibly bold the ingredient list or grab a description?
					</div>
					<!--<div class="recipe-card--review mt-auto">
						<b-icon-star-fill></b-icon-star-fill>
						<b-icon-star-fill></b-icon-star-fill>
						<b-icon-star-fill></b-icon-star-fill>
						<b-icon-star-half></b-icon-star-half>
						<b-icon-star></b-icon-star>
					</div>-->
				</div>
			</div>
		</div>
		<div class="card-footer d-flex justify-content-between">
			<div class="recipe-card--badges">
				<span class="badge badge-pill badge-secondary mx-1"
					>Cooktime: {{recipe.cook_time}} minutes or less</span
				>
				<span class="badge badge-pill badge-secondary mx-1"
					>Diet: {{recipe.diet_type}}</span
				>
				<span class="badge badge-pill badge-secondary mx-1"
					>Meal: NA</span
				>
			</div>
			<div class="recipe-card--view">
				<button @click = "getRecipeCard(recipe.id)" class="btn btn-sm btn-primary">View Recipe</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RecipeCard',
	props: {
      recipe: Object
	},
	methods:{
		getRecipeCard(id){
			this.$router.replace("/recipes/" +  id);
		}
	}
}
</script>

<style scoped>
.recipe-card {
	text-align: left;
}
</style>
