<template>
	<div class="chef-ingredient">
		{{ ingredient.ingredient_name }}
		<button
			type="button"
			class="btn btn-outline-success btn-sm close"
			v-if="listType === 'search'"
			@click="addPantryItem"
		>
			Add
		</button>
		<button type="button" class="btn btn-outline-danger btn-sm" v-else>
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
		addPantryItem() {
			this.$store.dispatch('profile/createProfile', this.profile)
			this.profile = {
				name: '',
				ingredients: []
			}
		}
	}
}
</script>

<style scoped></style>
