<template>
	<div class="card m-4" style="width: 30%">
		<div class="card-header">
			<h5 class="card-title">
				Add Ingredient
			</h5>
		</div>
		<div class="card-body my-2" style="width: 18rem;">
			<AutoComplete
				:componentTitle="Title1"
				:suggestionsMstr="suggestionsMstr"
				:objectAttribute="Attr1"
				:toolTip="Tip1"
			></AutoComplete>
			<br /><br />
			<b-button variant="outline-secondary" class="ml-3">Add </b-button>
		</div>
	</div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete.vue'
import { mapActions } from 'vuex'


export default {
	name: 'ingredients',
	props: {
		suggestionsMstr: {
			type: Array,
			required: true
		}
	},
	components: {
		AutoComplete
	},
	methods: {
		...mapActions('pantry', {
			addItem: 'addItem'
		})
	},
	data: function() {
		return {
			unitsOfMeasure: [
				{
					name: 'kilogram',
					abbreviation: 'kg'
				},
				{
					name: 'gram',
					abbreviation: 'g'
				},
				{
					name: 'milligram',
					abbreviation: 'mg'
				},
				{
					name: 'pound',
					abbreviation: 'lb'
				},
				{
					name: 'liter',
					abbreviation: 'L'
				},
				{
					name: 'milliliter',
					abbreviation: 'mL'
				}
			],
			Title1: 'Ingredient',
			Attr1: 'ingredient_name',
			Tip1: 'Choose ingredient to add to your pantry.',
			currentDate: new Date().toISOString().substr(0, 10)
		}
	}
}
</script>

<style scoped></style>
