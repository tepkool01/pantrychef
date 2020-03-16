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
		Ingredient
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
		}
	},
	created() {
		this.getIngredients()

		if (this.activeProfile) {
			this.getShoppingList(this.activeProfile)
		}

		this.$emit('title', 'Pantry')
	},
	data() {
		return {
			pantryType: "shopping"
		}
	}
}

</script>

<style scoped></style>
