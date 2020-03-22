<template>
	<div>
	<ErrorBar :errorList='errors' v-if="this.errors.length > 0"></ErrorBar>
		<div class="row">
			<IngredientSubmissionPanel
				:suggestionsMstr="ingredients"
				@clickedItem="addIngredientToPantry"
			></IngredientSubmissionPanel>

			<div class="card m-4 text-center" style="width:50%">
				<div class="card-header">
					<h5 class="card-title">
						Pantry List
					</h5>
				</div>
				<div class="card-body m-4 text-center" style="width: 50%">
					<div v-for="i in pantryList" v-bind:key="i.name">
						<ingredient
							:ingredient="i"
							:key="i.id"
							:listType="pantryType"
							@removeCall="handleIngredientRemove"
						></ingredient>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ErrorBar from '@/components/ErrorBar.vue'
import Ingredient from '@/components/Ingredient.vue'
import IngredientSubmissionPanel from '@/components/IngredientSubmissionPanel.vue'
//import Profile from "../store/modules/profile";

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Pantry',
	computed: {
		...mapGetters('pantry', {
			pantryList: 'pantry'
		}),
		...mapGetters('ingredients', {
			ingredients: 'ingredients'
		}),
		...mapGetters('profile', {
			profiles: 'profiles',
			activeProfile: 'activeProfile'
		})
	},
	components: {
		IngredientSubmissionPanel,
		Ingredient,
		ErrorBar
		//Profile
	},
	methods: {
		...mapActions('pantry', {
			getPantry: 'getPantry',
			addIngredient: 'addIngredient',
			removeIngredient: 'removeIngredient'
		}),
		...mapActions('ingredients', {
			getIngredients: 'getIngredients'
		}),
		...mapActions('profile', {
			getProfiles: 'getProfiles'
		}),

		addIngredientToPantry (ingredient) {
			this.addIngredient({
				ingredient: ingredient,
				profile_id: this.activeProfile
			})
		},
		handleIngredientRemove (ingredient) {
			this.removeIngredient({
				ingredient: ingredient,
				profile_id: this.activeProfile
			})
		}
	},
	watch: {
		activeProfile: function(val) {
			this.getPantry(this.activeProfile)	

			this.errors=""

			if(this.pantryList == null || this.pantryList.length == 0){
				this.errors+="ERROR: Pantry List did not load or is empty."
			}	

			if(this.ingredients == null){
				this.errors+="ERROR: Add Ingredient Module not loaded."
			}	

			if(this.activeProfile == null){
				this.errors+="ERROR:  Active profile not loaded."
			}	
		}
	},
	data() {
		return {
			pantryType: 'pantry',
			errors:""
		}
	},
	created() {
		this.getIngredients()
		this.$emit('title', 'Pantry')
	},
	mounted() {
		if(this.activeProfile == null){
			this.errors="ERROR: Active profile not loaded. Potential Internet connection issue."
		}
	}
}
</script>

<style scoped>
.border-between > [class*='col-']:before {
	background: #e3e3e3;
	bottom: 0;
	content: ' ';
	left: 0;
	position: absolute;
	width: 1px;
	top: 0;
}

.border-between > [class*='col-']:first-child:before {
	display: none;
}
</style>
