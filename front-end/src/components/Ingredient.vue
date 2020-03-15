<template>
	<div class="chef-ingredient">
		{{ ingredient.ingredient_name }}
		<button
			type="button"
			class="btn btn-outline-success btn-sm close"
			v-if="listType === 'search'"
			@click="handleAddIngredient"
		>
			Add
		</button>
		<button type="button" class="btn btn-outline-danger btn-sm" @click="handleRemoveIngredient" v-else>
			Remove
		</button>
	</div>
</template>

<script>
export default {
	name: 'Ingredient',
	props: {
		ingredient: {
			type: Object,
			required: true
		},
		listType: {
			type: String,
			required: true,
			validator: function (value) {
				return ['shopping', 'pantry', 'search'].indexOf(value) !== -1
			}
		}
	},
	methods: {
	handleAddIngredient: function() {
		this.$emit('addCall',this.ingredient)
		},
	handleRemoveIngredient: function() {
		this.$emit('removeCall',this.ingredient)
		}
	}
}
</script>

<style scoped></style>
