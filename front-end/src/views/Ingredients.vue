<template>
	<div>
		<div class="row">

			<IngredientSubmissionPanel :suggestionsMstr="ingredients" @clickedItem="eventChild"></IngredientSubmissionPanel>

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
		}),
		eventChild: function(value) {
      		console.log('submit here!') // someValue
			  console.log(value) // someValue
		},
		handleIngredientRemove: function(value) {
      		console.log('remove here!') // someValue
			  console.log(value) // someValue
		}
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
