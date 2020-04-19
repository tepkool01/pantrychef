<template>
	<div class="ingredient-submission-panel card my-2">
		<div class="card-body">
			<h4 class="header-title text-left mb-3">
				Stock my pantry
			</h4>
			<div class="row">
				<div class="col-md-12">
					<div class="input-group">
						<AutoComplete
							:componentTitle="Title1"
							:suggestionsMstr="suggestionsMstr"
							:objectAttribute="Attr1"
							:toolTip="Tip1"
							@selection="selectionEvent"
						></AutoComplete>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<b-button
						variant="outline-secondary"
						@click="childEvent"
						v-if="Object.keys(this.selected_ingredient).length !== 0"
						class="ml-1"
					>
						Add to Pantry
					</b-button>
					<b-button
						variant="outline-secondary"
						v-if="Object.keys(this.selected_ingredient).length !== 0"
						class="ml-1"
                        @click="addToShopping"
					>
						Add to Shopping List
					</b-button>
				</div>
			</div>
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
			addToShopping() {
			    this.$emit('addToShopping', this.selected_ingredient);
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

<style scoped>
	.card .header-title {
		margin-bottom: .5rem;
		text-transform: uppercase;
		letter-spacing: .02em;
		font-size: .9rem;
		margin-top: 0;
	}

	.input-group {
		z-index: 9999;
	}

	.ingredient-submission-panel {
		height: 151px;
	}
</style>
