<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Display Ingredients</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-10 offset-1">
				<div class="card-deck">
					<div class="card m-4">
						<div class="card-header">
							<h5 class="card-title">Add new Ingredients</h5>
						</div>
						<div class="card-body my-2">
							<AutoComplete :componentTitle="Title1" :suggestionsMstr="ingredients" :objectAttribute="Attr1" :toolTip="Tip1" ></autoComplete>
							<AutoComplete :componentTitle="Title2" :suggestionsMstr="unitsOfMeasure" :objectAttribute="Attr2" :toolTip="Tip2" ></autoComplete>
		
				
						</div>

					</div>

					<div class="card m-4">
						<div class="card-header">
							<h5 class="card-title">
								Ingredients in Pantry
							</h5>
						</div>
						<div class="card-body my-2">
							<div v-for="i in ingredients" v-bind:key="i.name">
								<ingredient :ingredient="i" :key="i.id"></ingredient>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Ingredient from '@/components/Ingredient.vue'
import AutoComplete from '@/components/AutoComplete.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'ingredients',
	computed: {
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		})
	},
	components: {
		Ingredient,
		AutoComplete
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
	data: function () {
		return {
			unitsOfMeasure: [ 
				{"name": "kilogram",
				 "abbreviation": "kg"
				},
				{"name": "gram",
				 "abbreviation": "g"
				},
				{"name": "milligram",
				 "abbreviation": "mg"
				},
				{"name": "pound",
				"abbreviation":"lb"
				},
				{"name":"liter",
				  "abbreviation":"L"
				},
				{"name":"milliliter",
				"abbreviation":"mL"
				}],
			Title1: 'Ingredient',
			Attr1: 'ingredient_name',
			Tip1: 'Choose ingredient to add to your pantry.',
			Title2: 'Unit',
			Attr2: 'abbreviation',
			Tip2: 'Choose the unit of measure for your ingredient.'
		}
	}
}
</script>

<style scoped></style>
