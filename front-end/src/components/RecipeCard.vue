<template>
	<div class="card recipe-card m-3">
		<div
			class="card-header recipe-card--header d-flex justify-content-between"
		>
			<h4 class="recipe-card--title">Simple Italian Omelette</h4>
			<button class="btn btn-sm btn-light active">
				<b-icon-check></b-icon-check>
				All Ingredients Present
			</button>
		</div>
		<div class="card-body">
			<div class="row no-gutters">
				<div class="col-lg-3">
					<img src="https://placekitten.com/150/150" />
				</div>
				<div
					class="col-lg-9 recipe-card--body d-flex align-items-start flex-column"
				>
					<div class="recipe-card--description">
						I'm calling this an "Italian" omelette for a couple of
						reasons. First, I used olive oil instead of butter
						and... <a href="">View more.</a>
					</div>
					<div class="recipe-card--review mt-auto">
						<b-icon-star-fill></b-icon-star-fill>
						<b-icon-star-fill></b-icon-star-fill>
						<b-icon-star-fill></b-icon-star-fill>
						<b-icon-star-half></b-icon-star-half>
						<b-icon-star></b-icon-star>
					</div>
				</div>
			</div>
		</div>
		<div class="card-footer d-flex justify-content-between">
			<div class="recipe-card--badges">
				<span class="badge badge-pill badge-secondary mx-1"
					>Cooktime: 30 minutes or less</span
				>
				<span class="badge badge-pill badge-secondary mx-1"
					>Diet: Vegetarian</span
				>
				<span class="badge badge-pill badge-secondary mx-1"
					>Meal: Breakfast</span
				>
			</div>
			<div class="recipe-card--view">
				<button class="btn btn-sm btn-primary">View Recipe</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RecipeCard'
}
</script>

<style scoped>
.recipe-card {
	text-align: left;
}
</style>
