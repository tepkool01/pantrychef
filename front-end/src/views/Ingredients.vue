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
							<AutoComplete :suggestionsMstr="ingredients" ></autoComplete>
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
			cities: ['FLorida','Texas']
		}
	},
}
</script>

<style scoped></style>
