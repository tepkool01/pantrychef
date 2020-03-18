<template>
	<div>
		<div class="row">
			<div class="card m-4 text-center" style="...">
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
export default {
	name: 'RecipeCard',
	methods: {
		addFavoriteRecipe(id) {
			// todo
			console.log(id)
		}
	}
}
</script>

<style scoped>
.star-icon {
	float: left;
}
</style>
