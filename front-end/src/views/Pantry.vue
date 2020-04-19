<template>
	<div>
		<div class="row mt-4">
			<!-- START: Add Ingredients -->
			<div class="col-md-12">
				<IngredientSubmissionPanel
					:suggestionsMstr="ingredients"
					@clickedItem="addIngredientToPantry"
                    @addToShopping="addIngredientToShoppingList"
				></IngredientSubmissionPanel>
			</div>
			<!-- END: Add Ingredients -->
		</div>
		<div class="row">
			<!-- START: My Pantry -->
			<div class="col-md-6 col-xs-12">
				<div class="card">
					<div class="card-body" style="position: relative;">
						<a href="#" class="btn btn-light btn-sm float-right" @click="sortOrder = (sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')">
							<b-icon icon="chevron-down"></b-icon>
						</a>
						<h4 class="header-title mb-3 text-left">Current Ingredients</h4>
						<span v-for="ingredient in sort(pantryList, sortOrder)" :key="ingredient.id">
                            <ingredient
                                :ingredient="ingredient"
                                :listType="'pantry'"
                                @removeCall="handleIngredientRemove"
                            ></ingredient>
						</span>
					</div>
				</div>
			</div>
			<!-- END: My Pantry -->
			<!-- START: My Shopping List -->
			<div class="col-md-6 col-xs-12">
				<div class="card">
					<div class="card-body" style="position: relative;">
						<a href="#" class="btn btn-light btn-sm float-right" @click="shoppingSortOrder = (shoppingSortOrder === 'A-Z' ? 'Z-A' : 'A-Z')">
							<b-icon icon="chevron-down"></b-icon>
						</a>
						<h4 class="header-title mb-3 text-left">Shopping List</h4>
                        <span v-for="ingredient in sort(shoppingList, shoppingSortOrder)" :key="ingredient.id">
							<ingredient
                                    :ingredient="ingredient"
                                    :listType="'shopping'"
                                    @removeCall="removeIngredientFromShopping"
                            ></ingredient>
						</span>
					</div>
				</div>
			</div>
			<!-- END: My Shopping List -->
		</div>
		<div class="row">
			<!-- START: Suggested Recipes -->
			<div class="col-md-12">
				<div class="card my-2">
					<div class="card-body">
						<h4 class="header-title mb-3 text-left">Top suggested WeightWatcher recipes</h4>
                        <label>Weight Watcher Points (Daily): </label><input type="text" v-model="ww_score">
                        <label>Smallest Meal Size in Points: </label><input type="text" v-model="smallest_ww_meal">
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
			<!-- END: Suggested Recipes -->
		</div>
	</div>
</template>

<script>
import { EventBus } from '../eventBus'; // used for Errors
import Ingredient from '../components/Ingredient.vue';
import IngredientSubmissionPanel from '../components/IngredientSubmissionPanel.vue';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import api from '../api';

export default {
	name: 'Pantry',
	data() {
		return {
            sortOrder: 'default',
			shoppingSortOrder: 'default',
            ww_score: 25,
			smallest_ww_meal: 1,
            ww_recommendations: [],
            timer: null,
		}
	},
	computed: {
		...mapGetters('pantry', {
			pantryList: 'pantry'
		}),
		...mapGetters('shoppingList', {
			shoppingList: 'shopping'
		}),
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		}),
		...mapGetters('profile', {
			profiles: 'profiles',
			activeProfile: 'activeProfile'
		}),
		orderedListOptions () {
			return {
				"default": (list) => {
					return list;
				},
				"A-Z": (list) => {
					return _.orderBy(list, 'ingredient_name', ['asc']);
				},
				"Z-A": (list) => {
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
		...mapActions('shoppingList', {
			getShoppingList: 'getShoppingList',
			addIngredientShopping: 'addIngredient',
			removeIngredientShopping: 'removeIngredient'
		}),
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
		addIngredientToShoppingList (ingredient) {
			this.addIngredientShopping({
				ingredient: ingredient,
				profile_id: this.activeProfile
			});
		},
		removeIngredientFromShopping (ingredient) {
			this.removeIngredientShopping({
				ingredient: ingredient,
				profile_id: this.activeProfile
			});
		},
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
		sort (list, sortOrder) {
			return this.orderedListOptions[sortOrder](list);
		},
        // 'Algorithmic' Component
        async findMealsByWWPoints() {
			// Invoking directly, because this doesn't need to be saved in the state for any particular reason
            try {
				const result = await api.recipe.getRecipes({
					includeShoppingList: true,
					includePantryList: true,
					limit: 10000,
					offset: 0,
					searchName: '',
					ww: this.ww_score,
					smallest_ww: this.smallest_ww_meal,
				});
				this.ww_recommendations = result.data;
            } catch (e) {
            	console.log(e);
				EventBus.setAlert('Warning', 2, 'Could not retrieve weight watcher ' +
                    'recommendations. Perhaps try a different weight watcher count or adding ingredients to your' +
                    ' pantry/shopping list?');
            }

        },
	},
	watch: {
		activeProfile (profile_id) {
			if (!profile_id) {
				EventBus.setAlert('Error', 1, 'Could not load active profile');
			} else {
				this.getPantry(profile_id);
				this.getShoppingList(profile_id);
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
		},
		ww_score(val) {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
                this.findMealsByWWPoints();
			}, 400);
        },
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

		// Get WW Recommendations
        this.findMealsByWWPoints();
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
