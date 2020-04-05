<template>
	<div>
		<div class="row">
			<IngredientSubmissionPanel
				:suggestionsMstr="ingredients"
				@clickedItem="addIngredientToPantry"
			></IngredientSubmissionPanel>

			<div class="card m-4 text-center" style="width:50%">
				<div class="card-header">
					<h5 class="card-title">
						Pantry List
					</h5>
				</div>
				<div class="card-body m-4 text-center" style="width: 50%">
					<div v-for="i in pantryList" v-bind:key="i.name">
						<ingredient
							:ingredient="i"
							:key="i.id"
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

export default {
	name: 'Pantry',
	data() {
		return {
			pantryType: 'pantry',
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
</style>
