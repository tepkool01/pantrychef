<template>
	<div>
		<div class="row">

			<IngredientSubmissionPanel :suggestionsMstr="ingredients" @clickedItem="addIngredientToShoppingList"></IngredientSubmissionPanel>

			<div class="card m-4 text-center" style="width:50%">
				<div class="card-header">
					<h5 class="card-title">
						Shopping List
					</h5>
				</div>
                <div class="card-body m-4 text-center" style="width: 50%">
                    <a href="#" @click="sortOrder = (sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')">SORT</a>
                    <div v-for="ingredient in sort(sortOrder)" :key="ingredient.id">
                        <ingredient
                                :ingredient="ingredient"
                                :listType="pantryType"
                                @removeCall="handleIngredientRemove"
                        ></ingredient>
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

<style scoped></style>
