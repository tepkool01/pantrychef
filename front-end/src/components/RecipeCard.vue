<template>
	<div class="card recipe-card m-3">
		<div class="card-header recipe-card--header d-flex justify-content-between">
			<h4 class="recipe-card--title">{{recipe.recipe_name}}</h4>
			<button class="btn btn-sm btn-light active">
				<template v-if="parseInt(recipe.ingredients_in_pantry) ===  parseInt(recipe.ingredient_count)">
				<b-icon-check></b-icon-check>
				All Ingredients Present
				</template>

				<template v-else>{{ recipe.ingredients_in_pantry }} of {{ recipe.ingredient_count }} ingredients ({{parseFloat(recipe.match_percent) * 100}}% Match) </template>
			</button>
		</div>
		<div class="card-body">
			<div class="row no-gutters">
				<div class="col-lg-3">
					<img v-if="recipe.img_url" :src="'img/food/' + recipe.img_url" style="width: 100px; height: 100px"/>
					<div v-else style="width: 100px; height: 100px; background-color: #5b6976; text-align: center; color: white;">Noneya</div>
				</div>
				<div class="col-lg-9 recipe-card--body d-flex align-items-start flex-column">
					<div class="recipe-card--description">
						<ul v-if="ingredients.length > 0">
							<li v-for="ingredient in ingredients">{{ingredient}}</li>
						</ul>
						<div v-else>loading...</div>
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
import {mapActions} from "vuex";

export default {
	name: 'RecipeCard',
	data() {
		return {
			ingredients: []
		}
	},
	props: {
      	recipe: Object
	},
	methods: {
		...mapActions('recipes', {
			getRecipeIngredients: 'getRecipeIngredients'
		}),
		getRecipeCard(id){
			this.$router.replace("/recipes/" +  id);
		}
	},
	watch: {
		recipe: function(val) {
			this.getRecipeIngredients(this.recipe.id).then(result => {
				this.ingredients = result.data
			})
		}
	},
	created() {
		this.ingredients = []
		this.getRecipeIngredients(this.recipe.id).then(result => {
			this.ingredients = result.data
		})
	}
}
</script>

<style scoped>
.recipe-card {
	text-align: left;
}
</style>
