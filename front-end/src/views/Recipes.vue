<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Recipes</h1>
			</div>
		</div>
		<div class="row">
            <!-- All the recipe cards are here-->
			<div v-for="i in recipes" v-bind:key="i.name">
				<recipe-card :recipe="i" v-if="i.id"></recipe-card>
			</div>
		</div>
        <!-- This is the modal for view recipe -->
        <div
                v-if="isRecipeOpen"
                @click.self="close"
                class="recipe-modal"
        >
            <router-view />
        </div>
	</div>
</template>

<script>
import RecipeCard from '../components/RecipeCard'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'recipes',
	computed: {
		...mapGetters('recipes', {
			recipes: 'recipes'
		}),
		...mapGetters('profile', {
			activeProfile: 'activeProfile'
		}),
        isRecipeOpen() {
			return this.$route.name === 'ViewRecipe'
        }
	},
	components: {
		RecipeCard,
	},
	watch: {
		activeProfile: function(val) {
			this.getRecipes()
		}
	},
	methods: {
		...mapActions('recipes', {
			getRecipes: 'getRecipes'
		}),
		close () {
			console.log("Closing");
			this.$router.push({ name: 'recipes' })
		}
	},
	created() {
		this.getRecipes()
		this.$emit('title', 'Pantry')
	}
}
</script>

<style scoped>
.recipe-modal {
    background: rgba(0,0,0,0.5);
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}
</style>
