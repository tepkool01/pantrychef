<template>
	<div class="card recipe-card m-0 m-md-3">
		<div class="card-header recipe-card--header d-flex justify-content-between">
			<h4 class="recipe-card--title">{{recipe.recipe_name}}</h4>
			<button class="btn btn-sm btn-light active">
                <template v-if="recipe.ingredients_in_pantry ==  recipe.ingredient_count">
                    <b-icon-check></b-icon-check>
                    All Ingredients Present
                </template>

                <template v-else>
                    {{ recipe.ingredients_in_pantry }} of {{ recipe.ingredient_count }}
                    ingredients ({{parseInt(parseFloat(recipe.match_percent) * 100)}}% Match)
                </template>
			</button>
		</div>
		<div class="card-body">
			<div class="row no-gutters">
				<div class="col-md-12 col-xl-3 align-content-center pr-xl-3">
					<div v-if="recipe.img_url"
						 class="recipe-img"
                         :style="'background-image: url(img/recipes/' + recipe.img_url + ');'"
					></div>
					<div v-else
                         style="width: 100px; height: 100px; background-color: #5b6976;">
                        Noneya
                    </div>
				</div>
				<div class="col-md-12 col-xl-9 recipe-card--body d-flex align-items-start flex-column">
					<div class="recipe-card--description" v-html="recipe.summary">

					</div>
				</div>
			</div>
		</div>
		<div class="card-footer d-flex justify-content-between">
			<div class="recipe-card--badges">
				<span class="badge badge-pill badge-secondary mx-1">
                    Cooktime: {{recipe.cook_time}} minutes or less
                </span>
                <span class="badge badge-pill badge-secondary mx-1">
                    Servings: {{recipe.servings}}
                </span>
                <span class="badge badge-pill badge-secondary mx-1">
                    Health Score: {{recipe.health_score}}
                </span>
                <span class="badge badge-pill badge-secondary mx-1">
                    WW Points: {{recipe.weight_watcher_points}}
                </span>
                <span v-if="recipe.vegan === true" class="badge badge-pill badge-secondary mx-1">
                    Vegan
                </span>
                <span v-if="recipe.vegetarian === true" class="badge badge-pill badge-secondary mx-1">
                    Vegetarian
                </span>
                <span v-if="recipe.gluten_free === true" class="badge badge-pill badge-secondary mx-1">
                    Gluten Free
                </span>
                <span v-if="recipe.dairy_free === true" class="badge badge-pill badge-secondary mx-1">
                    Dairy Free
                </span>
                <span v-if="recipe.healthy === true" class="badge badge-pill badge-secondary mx-1">
                    Healthy
                </span>
                <span v-if="recipe.sustainable === true" class="badge badge-pill badge-secondary mx-1">
                    Sustainable
                </span>
			</div>
			<div class="recipe-card--view">

				<button @click = "getRecipeCard(recipe.id)" class="btn btn-sm btn-primary"
				id="view_recipe_submission_button">View Recipe</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'RecipeCard',
	data() {
		return {
			ingredients: [],
		};
	},
	props: {
		recipe: Object,
	},
	methods: {
		...mapActions('recipes', {
			getRecipeIngredients: 'getRecipeIngredients',
		}),
		getRecipeCard(id) {
			this.$router.push({
                name: 'ViewRecipe',
                params: {
                	id: id
                }
            })
		},
	},
};
</script>

<style scoped>
.recipe-card {
	text-align: left;
}
.recipe-img {
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	min-width: 250px;
	max-width: 100%;
	min-height: 200px;
	max-height: 100%;
	border-radius:3px;
}
</style>
