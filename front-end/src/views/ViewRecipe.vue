<template>
	<div class="inner-modal">
		<div class="row">
			<div class="card m-4 text-center">
				<div class="card-header">
                    <img v-if="recipe.img_url" :src="'img/recipes/' + recipe.img_url" />
					<h1 class="card-title">
						{{ recipe.name }}
					</h1>
					<p v-html="recipe.summary"></p>
					<b-icon-star
						@click="addFavoriteRecipe($route.params.id)"
						class="star-icon"
						>Add Fav recipe to pantry
					</b-icon-star>
				</div>
			</div>
			<div class="view-recipe--view">
                <p>Cook Time: {{ recipe.cook_time }}</p>
                <p>Servings: {{ recipe.servings }}</p>
                <p>Health Score: {{ recipe.health_score }}</p>
                <p>Weight Watcher Points: {{ recipe.weight_watcher_points }}</p>
                <p>Vegetarian: {{ recipe.vegetarian }}</p>
                <p>Vegan: {{ recipe.vegan }}</p>
                <p>Gluten Free: {{ recipe.gluten_free }}</p>
                <p>Dairy Free: {{ recipe.dairy_free }}</p>
                <p>Healthy: {{ recipe.healthy }}</p>
                <p>Sustainable: {{ recipe.sustainable }}</p>
                <p>Ingredients</p>
                <ul>
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">{{ ingredient.name }}</li>
                </ul>
                <p>Directions</p>
                <ol>
                    <li v-for="direction in recipe.directions" :key="direction.order">{{ direction.direction }}</li>
                </ol>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../api';

export default {
	name: 'RecipeCard',
    data() {
	    return {
	    	recipe: {
				name: "",
				cook_time: 0,
				img_url: "",
				servings: 0,
				summary: "",
				health_score: 4,
                weight_watcher_points: 2,
                vegetarian: false,
                vegan: false,
                gluten_free: false,
                dairy_free: false,
                healthy: false,
                sustainable: false,
                directions: [],
                ingredients: [],
            }
        }
    },
	methods: {
		addFavoriteRecipe(id) {
			// todo
			console.log(id)
		}
	},
    created() {
		// Don't need to hold state, seed recipe into data direct
		api.recipe.getRecipe(this.$route.params.id).then(result => {
			this.recipe = result.data
        });
    }
}
</script>

<style scoped>
.star-icon {
	float: left;
}
.inner-modal {
    background-color: #2c3e50;
    width: 75%;
    margin: auto auto;
}
</style>
