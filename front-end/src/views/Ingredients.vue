<template>
	<div>
		<ErrorBar :errorList='errors' v-if="this.errors.length > 0"></ErrorBar>
		<div class="row">

			<IngredientSubmissionPanel :suggestionsMstr="ingredients" @clickedItem="addIngredientToShoppingList"></IngredientSubmissionPanel>

			<div class="card m-4 text-center" style="width:50%">
				<div class="card-header">
					<h5 class="card-title">
						Shopping List
					</h5>
				</div>
				<div class="card-body m-4 text-center" style="width: 50%">
					<div v-for="i in shoppingList" v-bind:key="i.name">
						<ingredient :ingredient="i" :key="i.id" :listType="pantryType" @removeCall="handleIngredientRemove"></ingredient>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue'
import IngredientSubmissionPanel from '@/components/IngredientSubmissionPanel.vue'
import ErrorBar from '@/components/ErrorBar.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'ingredients',
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
		})
	},
	components: {
		IngredientSubmissionPanel,
		Ingredient,
		ErrorBar
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
		addIngredientToShoppingList (ingredient) {
			this.addIngredient({
				ingredient: ingredient,
				profile_id: this.activeProfile
			})
		},
		handleIngredientRemove (ingredient) {
			this.removeIngredient({
				ingredient: ingredient,
				profile_id: this.activeProfile
			})
		}
	},
	watch: {
		activeProfile: function(val) {
			this.getShoppingList(this.activeProfile)	
			this.getIngredients()
			
			if(this.activeProfile){
				this.errors=""
			}
		},
		shoppingList: function(val) {
			if(this.shoppingList == null || this.shoppingList.length == 0){
				this.errors+="ERROR: Shopping List did not load or is empty."
			}	
		},
		ingredients: function(val) {
			if(this.ingredients == null){
				this.errors+="ERROR: Add Ingredient Module not loaded."
			}	
		}
	},
	created() {
		this.$emit('title', 'Pantry')
	},
	data() {
		return {
			pantryType: "shopping",
			errors:""
		}
	},
	mounted() {
		if(this.activeProfile == null){
			this.errors+="ERROR:  Active profile not loaded."
		}	
	}
}

</script>

<style scoped></style>
