<template>
	<div class="inner-modal">
		<div class="card mb-3 mt-2 text-left">
			<div class="card-body">
				<div class="row pb-3">
					<div class="col-md-4">
						<img class="mr-3 recipe--image" :src="'/img/recipes/' + recipe.img_url">
					</div>
					<div class="col-md-8">
						<h5 class="mt-0 header-title">{{recipe.name}}</h5>
						<p class="card-text" v-html="recipe.summary"></p>
					</div>
				</div>
				<div class="row recipe--metadata pt-3 pb-2 border-top border-bottom">
					<span>Cooktime: {{ recipe.cook_time }} mins</span>
					<span>Servings: {{ recipe.servings }}</span>
					<span>Health Score: {{ recipe.health_score }}%</span>
					<span>Weight Watcher Points: {{ recipe.weight_watcher_points }}</span>
					<span v-if="recipe.vegetarian !== false">Vegetarian <b-icon-check></b-icon-check></span>
					<span v-if="recipe.vegan !== false">Vegan <b-icon-check></b-icon-check></span>
					<span v-if="recipe.gluten_free !== false">Gluten Free <b-icon-check></b-icon-check></span>
					<span v-if="recipe.dairy_free !== false">Dairy Free <b-icon-check></b-icon-check></span>
					<span v-if="recipe.healthy !== false">Healthy <b-icon-check></b-icon-check></span>
					<span v-if="recipe.sustainable !== false">Sustainable <b-icon-check></b-icon-check></span>
				</div>
				<div class="row pt-3 pb-2">
					<div class="col-md-3 col-xs-12">
						<h4>
							Ingredients
						</h4>
						<ul>
							<li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
								{{ingredient.amount}} {{ingredient.amount_unit}} {{ ingredient.name }}
							</li>
						</ul>
					</div>
					<div class="col-md-9 col-xs-12">
						<h4>
							Directions
						</h4>
						<ol>
							<li v-for="direction in recipe.directions" :key="direction.order">{{
								direction.direction }}
							</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="card-footer text-right">
				<button type="button" @click="close" class="btn btn-secondary btn-sm mx-2">
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../api';

export default {
	name: 'RecipeCard',
	data() {
		return {
			recipe: {
				name: '',
				cook_time: 0,
				img_url: '',
				servings: 0,
				summary: '',
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
			},
		};
	},
	methods: {
        close() {
            this.$emit('closeWindow', true);
        },
	},
	created() {
		// Don't need to hold state, seed recipe into data direct
		api.recipe.getRecipe(this.$route.params.id).then((result) => {
			this.recipe = result.data;
		});
	},
};
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

	.recipe--name {
		color: #161e2e;
		font-weight: 500;
	}

	.recipe--metadata > span {
		background: #fff;
		border-radius: 8px;
		border: 1px solid #dadce0;
		box-sizing: border-box;
		color: #5f6368;
		display: inline-block;
		font-size: 14px;
		line-height: 16px;
		margin: 0 4px 10px 4px;
		overflow: hidden;
		padding: 7px 19px;
		position: relative;
	}

	.recipe--image {
		width: 100%;
		max-width: 556px;
		max-height: 370px;
	}

	.card h4 {
		margin-bottom: .5rem;
		text-transform: uppercase;
		letter-spacing: .02em;
		font-size: .9rem;
		margin-top: 0;
	}
</style>
