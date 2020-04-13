<template>
	<div>
		<div class="row m-4">
			<div class="col-md-4">
				<IngredientSubmissionPanel :suggestionsMstr="ingredients" @clickedItem="addIngredientToShoppingList"></IngredientSubmissionPanel>
			</div>
			<div class="col-md-8">
				<div class="card my-2">
					<div class="card-body" style="position: relative;">
						<div class="float-right">
							<b-dropdown id="dropdown-1" right text="Actions" size="sm" class="m-md-2" variant="light">
								<b-dropdown-item>Delete all</b-dropdown-item>
								<b-dropdown-item>Add all to pantry</b-dropdown-item>
								<b-dropdown-item>Email this list</b-dropdown-item>
								<b-dropdown-item @click="sortOrder = (sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')">Sort</b-dropdown-item>
							</b-dropdown>
						</div>
						<h4 class="header-title mb-3 text-left">
							Current Shopping List
						</h4>

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
	</div>
</template>

<script>
import { EventBus } from '../eventBus'; // used for Errors
import Ingredient from '../components/Ingredient.vue';
import IngredientSubmissionPanel from '../components/IngredientSubmissionPanel.vue';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

export default {
	name: 'ingredients',
	data() {
		return {
			pantryType: "shopping",
			sortOrder: 'default',
		}
	},
	computed: {
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		}),
		...mapGetters('shoppingList', {
			shoppingList: 'shopping'
		}),
		...mapGetters('profile', {
			profiles: 'profiles',
			activeProfile: 'activeProfile'
		}),
		orderedListOptions () {
			let list = this.shoppingList;
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
		...mapActions('ingredients', {
			getIngredients: 'getIngredients'
		}),
		...mapActions('shoppingList', {
			getShoppingList: 'getShoppingList',
			addIngredient: 'addIngredient',
			removeIngredient: 'removeIngredient'
		}),
		...mapActions('profile', {
			getProfiles: 'getProfiles'
		}),
		addIngredientToShoppingList (ingredient) {
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
				this.getShoppingList(profile_id);
			}
		},
		shoppingList (val) {
			if (val.length === 0) {
				EventBus.setAlert('Warning', 2, 'Shopping List did not load or is empty.');
			}
		},
		ingredients (val) {
			if (val.length === 0) {
				EventBus.setAlert('Error', 1, 'Could not retrieve ingredient list');
			}
		},
	},
	created() {
		this.$emit('title', 'Shopping List');

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
		float: right !important;
	}

</style>
