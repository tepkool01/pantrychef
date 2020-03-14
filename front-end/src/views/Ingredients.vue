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
							<div v-for="i in ingredients" v-bind:key="i.name">
								<ingredient :ingredient="i" :listType="pantryType" :key="i.id"></ingredient>
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
	},
	created() {
		this.getIngredients()
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
