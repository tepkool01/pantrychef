<template>
		<button
			:id="'ingredient_remove_' + ingredient.ingredient_name"
			type="button"
			class="remove_button btn btn-outline-secondary btn-sm chef-ingredient mx-2 my-1"
			@click="handleRemoveIngredient"
		>
			<b-icon-x class="delete-ingredient"></b-icon-x> {{ ingredient.ingredient_name}}
		</button>
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
			validator(value) {
        		return ['shopping', 'pantry', 'search'].indexOf(value) !== -1;
			},
		},
	},
	methods: {
		handleRemoveIngredient() {
			this.$emit('removeCall', this.ingredient);
		},
	},
};
</script>

<style scoped>
.chef-ingredient {
	border-radius: 30px;
	display: inline-block;
}

.delete-ingredient {
	color: firebrick;
}
</style>
