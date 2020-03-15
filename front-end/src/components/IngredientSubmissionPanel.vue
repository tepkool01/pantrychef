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
			<b-button variant="outline-secondary" class="ml-3" v-on:click="childEvent" v-if="this.selectedId != ''">Add</b-button>
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
		}),

		childEvent: function() {
			console.log("child event")
			this.$emit('clickedItem',this.selectedId)
		},
		selectionEvent: function(value){
			console.log("select")
			console.log(value)
			this.selectedId=value
		}
	},
	data: function() {
		return {
			Title1: 'Ingredient',
			Attr1: 'ingredient_name',
			Tip1: 'Choose ingredient to add to your pantry.',
			selectedId: '',
			currentDate: new Date().toISOString().substr(0, 10)
		}
	}
}
</script>

<style scoped></style>
