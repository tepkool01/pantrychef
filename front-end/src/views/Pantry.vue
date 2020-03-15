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
import Ingredient from '@/components/Ingredient.vue'
import IngredientSubmissionPanel from '@/components/IngredientSubmissionPanel.vue'
//import Profile from "../store/modules/profile";

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Pantry',
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
		})
	},
	components: {
		IngredientSubmissionPanel,
		Ingredient,
		//Profile
	},
	methods: {
		...mapActions('pantry', {
			getPantryList: 'getPantryList',
			addIngredient: 'addIngredient',
			removeIngredient: 'removeIngredient'
		}),
		...mapActions('ingredients', {
			getIngredients: 'getIngredients'
		}),
		...mapActions('profile', {
			getProfiles: 'getProfiles',
			activeProfile: 'activeProfile'
		}),

		addIngredientToPantry (ingredient) {
			this.addIngredient({
				ingredient_id: ingredient.id,
				profile_id: this.activeProfile
			})
		},
		handleIngredientRemove (ingredient) {
			this.removeIngredient({
				ingredient_id: ingredient.id,
				profile_id: this.activeProfile
			})
		}
	},
	watch: {
		activeProfile: function(val) {
			this.getPantryList(this.activeProfile)
		}
	},
	data() {
		return {
			pantryType: 'pantry'
		}
	},
	created() {
		//Get profile for this page
		if (this.activeProfile) {
			console.log("Calling pantry with ID", this.activeProfile)
			this.getPantryList(this.activeProfile)
		}

		this.getIngredients()
		this.$emit('title', 'Pantry')
	}
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
