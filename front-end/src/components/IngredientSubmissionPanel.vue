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
				@selection="selectionEvent"
			></AutoComplete>
			<br /><br />
			<b-button
                    variant="outline-secondary"
                    class="ml-3"
                    @click="childEvent"
                    v-if="Object.keys(this.selected_ingredient).length !== 0"
            >
                Add
            </b-button>
		</div>
	</div>
</template>

<script>
import AutoComplete from './AutoComplete.vue';

export default {
	name: 'ingredients',
	props: {
		suggestionsMstr: {
			type: Array,
			required: true,
		},
	},
	components: {
		AutoComplete,
	},
	methods: {
		childEvent() {
			this.$emit('clickedItem', this.selected_ingredient);
		},
		selectionEvent(value) {
			this.selected_ingredient = value;
		},
	},
	data() {
		return {
			Title1: 'Ingredient',
			Attr1: 'ingredient_name',
			Tip1: 'Choose ingredient to add to your pantry.',
			selected_ingredient: {},
			currentDate: new Date().toISOString().substr(0, 10),
		};
	},
};
</script>

<style scoped></style>
