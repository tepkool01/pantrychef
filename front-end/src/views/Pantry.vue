<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Pantry</h1>
			</div>
		</div>
		<div class="row">
			<IngredientSubmissionPanel :suggestionsMstr="ingredients"></IngredientSubmissionPanel>
			<div class="col-lg-10 offset-1">
				<div class="card-deck">

					<div class="card m-4">
						<div class="card-header">
							<h5 class="card-title">
								List of the Ingredients
							</h5>
						</div>
						<div class="card-body my-2">
							<div v-for="i in pantryList" v-bind:key="i.name">
								<ingredients :ingredient="i" :listType="pantryType"></ingredients>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Ingredients from '@/components/Ingredient.vue'
import IngredientSubmissionPanel from '@/components/IngredientSubmissionPanel.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Pantry',
	computed: {
		...mapGetters('pantry', {
			pantryList: 'pantry'
		}),
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		})
	},
	components: {
		IngredientSubmissionPanel,
		Ingredients
	},
	methods: {
		...mapActions('pantry', {
			getPantryList: 'getPantryList'
		}),
		...mapActions('ingredients', {
			getIngredients: 'getIngredients'
		}),
	},
	data() {
		return {
			pantryType: "pantry"
		}
	},
	created() {
		this.getIngredients()
		this.getPantryList()
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
