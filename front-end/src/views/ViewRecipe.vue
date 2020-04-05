<template>
	<div class="test">
		<div class="row">
			<div class="card m-4 text-center">
				<div class="card-header">
					<h1 class="card-title">
						View Recipe
					</h1>
					<p>Retrieve recipe with ID:{{ $route.params.id }}</p>
					<b-icon-star
						@click="addFavoriteRecipe($route.params.id)"
						class="star-icon"
						>Add Fav recipe to pantry
					</b-icon-star>
				</div>
			</div>
			<div class="view-recipe--view">
				<!-- <button @change="true" class="btn btn-sm btn-primary">Add Favorite Recipe to Pantry</button>-->
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../api';

export default {
	name: 'RecipeCard',
	methods: {
		addFavoriteRecipe(id) {
			// todo
			console.log(id)
		}
	},
    created() {
		api.recipe.getRecipe(this.$route.params.id).then(result => {
			console.log(result);
        });
        console.log("CREATE");
    }
}
</script>

<style scoped>
.star-icon {
	float: left;
}
    .test {
        background-color: #2c3e50;
    }
</style>
