<template>
	<div>
		<div class="row">
	
					<IngredientSubmissionPanel :suggestionsMstr="ingredients" ></IngredientSubmissionPanel>

					<div class="card m-4 text-center" style="width:50%">
						<div class="card-header">
							<h5 class="card-title">
								Ingredients In Pantry
							</h5>
						</div>
						<div class="card-body m-4 text-center" style="width: 50%">
							<div v-for="i in shoppingList" v-bind:key="i.name">
								<ingredient :ingredient="i" :listType="pantryType"></ingredient>
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
			shoppingList: 'shoppingList'
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
			getShoppingList: 'getShoppingList'
		})
	},
	created() {
		this.getIngredients()
		this.getShoppingList()
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
