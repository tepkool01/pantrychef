<template>
	<div class="chef-ingredient">
		{{ ingredient.ingredient_name }}
		<button
			:id="'ingredient_remove_' + ingredient.ingredient_name"
			type="button"
			class="remove_button btn btn-outline-danger btn-sm"
			@click="handleRemoveIngredient"
		>
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
			required: true,
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
		handleRemoveIngredient() {
			this.$emit('removeCall', this.ingredient);
		}
	},
};
</script>

<style scoped></style>
