<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Ingredients</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-10 offset-1">
				<div class="card-deck">
					<div class="card m-4">
						<div class="card-header">
							<h5 class="card-title">
								Display existing ingredients
							</h5>
						</div>
						<div class="card-body my-2">
							<div v-for="i in ingredients" v-bind:key="i.name">
								<ingredients :ingredients="i" :key="i.id"></ingredients>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Ingredients from '@/components/Ingredients.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'ingredients',
	computed: {
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		})
	},
	components: {
		Ingredients
	},
	methods: {
		...mapActions('ingredients', {
			getIngredients: 'getIngredients'
		})
	},
	created() {
		this.getIngredients()
		this.$emit('title', 'Pantry')
	}
}
</script>

<style scoped></style>
