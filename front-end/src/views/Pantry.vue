<template>
	<div>
		<div class="row mt-4">
			<div class="col-md-4">
				<IngredientSubmissionPanel
					:suggestionsMstr="ingredients"
					@clickedItem="addIngredientToPantry"
				></IngredientSubmissionPanel>
			</div>
			<div class="col-md-8">
				<div class="card my-2">
					<div class="card-body" style="position: relative;">
						<a href="#" class="btn btn-light btn-sm float-right" @click="sortOrder = (sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')">
							<b-icon icon="chevron-down"></b-icon>
						</a>
						<h4 class="header-title mb-3 text-left">Current Ingredients</h4>
						<span v-for="ingredient in sort(sortOrder)" :key="ingredient.id">
						<ingredient
							:ingredient="ingredient"
							:listType="pantryType"
							@removeCall="handleIngredientRemove"
						></ingredient>
					</span>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="card my-2">
					<div class="card-body">
						<h4 class="header-title mb-3 text-left">Top suggested recipes</h4>
						<div class="card-deck">
							<div class="card">
								<img class="card-img-top"style="width: 100%; height: 200px; background-color: grey;">
								<div class="card-body text-left">
									<h5 class="card-title">Recipe</h5>
									<p class="card-text text-muted small">
										Some quick example text to build on the card title and make up the bulk of the card's content. <a href="#">View Recipe</a>
									</p>
									<div>
										<p class="mb-2 text-muted small font-weight-bold">
											Ingredients
											<span class="float-right">100%</span>
										</p>
										<div class="progress progress-sm">
											<div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top"style="width: 100%; height: 200px; background-color: grey;">
								<div class="card-body text-left">
									<h5 class="card-title">Recipe</h5>
									<p class="card-text text-muted small">
										Some quick example text to build on the card title and make up the bulk of the card's content. <a href="#">View Recipe</a>
									</p>
									<div>
											<p class="mb-2 text-muted small font-weight-bold">
												Ingredients
												<span class="float-right">100%</span>
											</p>
											<div class="progress progress-sm">
												<div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
									</div>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top"style="width: 100%; height: 200px; background-color: grey;">
								<div class="card-body text-left">
									<h5 class="card-title">Recipe</h5>
									<p class="card-text text-muted small">
										Some quick example text to build on the card title and make up the bulk of the card's content. <a href="#">View Recipe</a>
									</p>
									<div>
										<p class="mb-2 text-muted small font-weight-bold">
											Ingredients
											<span class="float-right">100%</span>
										</p>
										<div class="progress progress-sm">
											<div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="card">
								<img class="card-img-top"style="width: 100%; height: 200px; background-color: grey;">
								<div class="card-body text-left">
									<h5 class="card-title">Recipe</h5>
									<p class="card-text text-muted small">
										Some quick example text to build on the card title and make up the bulk of the card's content. <a href="#">View Recipe</a>
									</p>
									<div>
										<p class="mb-2 text-muted small font-weight-bold">
											Ingredients
											<span class="float-right">100%</span>
										</p>
										<div class="progress progress-sm">
											<div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="mt-4 mb-2 text-center">
							<button class="btn btn-outline-primary">Find more recipes</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { EventBus } from '../eventBus'; // used for Errors
import Ingredient from '../components/Ingredient.vue';
import IngredientSubmissionPanel from '../components/IngredientSubmissionPanel.vue';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

export default {
	name: 'Pantry',
	data() {
		return {
			pantryType: 'pantry',
            sortOrder: 'default',
		}
	},
	computed: {
		...mapGetters('pantry', {
			pantryList: 'pantry'
		}),
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		}),
		...mapGetters('profile', {
			profiles: 'profiles',
			activeProfile: 'activeProfile'
		}),
		orderedListOptions () {
			let list = this.pantryList;
			return {
				"default": () => {
					return list;
				},
				"A-Z": () => {
					return _.orderBy(list, 'ingredient_name', ['asc']);
				},
				"Z-A": () => {
					return _.orderBy(list, 'ingredient_name', ['desc']);
				},
			}
		},
	},
	components: {
		IngredientSubmissionPanel,
		Ingredient,
	},
	methods: {
		...mapActions('pantry', {
			getPantry: 'getPantry',
			addIngredient: 'addIngredient',
			removeIngredient: 'removeIngredient'
		}),
		...mapActions('ingredients', {
			getIngredients: 'getIngredients'
		}),
		...mapActions('profile', {
			getProfiles: 'getProfiles'
		}),
		addIngredientToPantry (ingredient) {
			this.addIngredient({
				ingredient: ingredient,
				profile_id: this.activeProfile
			});
		},
		handleIngredientRemove (ingredient) {
			this.removeIngredient({
				ingredient: ingredient,
				profile_id: this.activeProfile
			});
		},
		sort (sortOrder) {
			return this.orderedListOptions[sortOrder]();
		},
	},
	watch: {
		activeProfile (profile_id) {
			if (!profile_id) {
				EventBus.setAlert('Error', 1, 'Could not load active profile');
			} else {
				this.getPantry(profile_id);
            }
		},
		pantryList (val) {
			if (val.length === 0) {
				EventBus.setAlert('Warning', 2, 'Pantry List did not load or is empty.');
			}
		},
		ingredients(val) {
			if (val.length === 0) {
				EventBus.setAlert('Error', 1, 'Could not retrieve ingredient list');
			}
		}
	},
	created() {
		this.$emit('title', 'Pantry');

		// Retrieve ingredients
        if (this.ingredients.length === 0) {
        	this.getIngredients();
        }

		// No active profile, retrieve it
		if (!this.activeProfile) {
			this.getProfiles();
        }
	},
}
</script>

<style scoped>
.page-title {
	font-size: 18px;
	margin: 0;
	line-height: 75px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: inherit;
}

.border-between > [class*='col-']:before {
	background: #e3e3e3;
	bottom: 0;
	content: ' ';
	left: 0;
	position: absolute;
	width: 1px;
	top: 0;
}

.border-between > [class*='col-']:first-child:before {
	display: none;
}
.card {
	border: none;
	box-shadow: 0 0 35px 0 rgba(154,161,171,.15);
	transition: 0.3s;
}

.card:hover {
	box-shadow: 0 0 35px 0 rgba(154,161,171,.35);
}
.card .header-title {
	margin-bottom: .5rem;
	text-transform: uppercase;
	letter-spacing: .02em;
	font-size: .9rem;
	margin-top: 0;
}
.float-right {
	float: right!important;
}
.progress-sm {
	height: 4px;
}
</style>
