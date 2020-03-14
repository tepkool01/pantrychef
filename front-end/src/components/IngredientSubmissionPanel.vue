<template>
    <div class="card m-4" style="width: 30%">
        <div class="card-header">
            <h5 class="card-title">
                Add Ingredient
            </h5>
        </div>
        <div class="card-body my-2" style="width: 18rem;">
            <AutoComplete :componentTitle="Title1" :suggestionsMstr="suggestionsMstr" :objectAttribute="Attr1" :toolTip="Tip1" ></autoComplete>
            <button type="button" class="btn btn-outline-success btn-sm" >Add</button>
        </div>
    </div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete.vue'

import { mapGetters, mapActions } from 'vuex'

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
			Tip2: 'Choose the unit of measure for your ingredient.',
            Value3: 0.0,
            Value3Previous:0.0,
            Title3: 'Amount',
            Tip3: 'Choose the amount for your ingredient.',
            Title4: 'Expiration Date',
            Tip4: 'Choose ingredient expiration date.',
            currentDate: new Date().toISOString().substr(0, 10)
		}
	}
}
</script>

<style scoped></style>
