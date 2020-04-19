<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Recipes</h1>
			</div>
			<!--<label>Search By Name</label>-->
			<!--<input type="text" v-model="searchName" @keyup="searchByName" />-->
			<!--<label>Include Shopping List Ingredients?</label>-->
			<!--<input type="checkbox" v-model="includeShoppingList" @click="includeShoppingList = !includeShoppingList" />-->
			<!--<label>Include Pantry List Ingredients?</label>-->
			<!--<input type="checkbox" v-model="includePantryList" @click="includePantryList = !includePantryList" />-->
		</div>
		<div class="row">
			<div class="col-lg-12 text-left">
				<div class="recipes--search">
					<div class="input-group">
					<span class="prepend-icon">
						<b-icon-search></b-icon-search>
					</span>
						<input
							type="text"
							class="form-control"
							v-model="searchName"
							@keyup="searchByName"
							placeholder="Search..."
						>
					</div>
					<div class="recipes--search-options form-row">
						<div class="form-check ml-2 pr-4">
							<input type="checkbox" class="form-check-input" v-model="includeShoppingList"
								   @click="includeShoppingList = !includeShoppingList"/>
							<label class="form-check-label small">Include Shopping List Ingredients</label>
						</div>
						<div class="form-check">
							<input type="checkbox" class="form-check-input" v-model="includePantryList"
								   @click="includePantryList = !includePantryList"/>
							<label class="form-check-label small">Include Pantry List Ingredients</label>
						</div>
					</div>
				</div>
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
			<router-view @closeWindow="close"/>
		</div>
	</div>
</template>

<script>
	import RecipeCard from '../components/RecipeCard'

	import {mapGetters, mapActions} from 'vuex'

	export default {
		name: 'recipes',
		data() {
			return {
				includeShoppingList: false,
				includePantryList: true,
				searchName: '',
				timer: null,
                offset: 0,
			}
		},
		computed: {
			...mapGetters('app', {
				currentLoadingStatus: 'currentLoadingStatus'
			}),
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
			activeProfile(val) {
				this.getRecipes({
					includeShoppingList: this.includeShoppingList,
					includePantryList: this.includePantryList,
					searchName: this.searchName,
                    offset: 0,
				})
			},
			includeShoppingList(val) {
				this.getRecipes({
					includeShoppingList: val,
					includePantryList: this.includePantryList,
					searchName: this.searchName,
					offset: 0,
				})
			},
			includePantryList(val) {
				this.getRecipes({
					includeShoppingList: this.includeShoppingList,
					includePantryList: val,
					searchName: this.searchName,
					offset: 0,
				})
			},
		},
		methods: {
			...mapActions('recipes', {
				getRecipes: 'getRecipes'
			}),
			searchByName() {
				// Setting up a timer so that we don't blast the API with requests
				if (this.timer) {
					clearTimeout(this.timer);
					this.timer = null;
				}
				this.timer = setTimeout(() => {
					this.getRecipes({
						includeShoppingList: this.includeShoppingList,
						includePantryList: this.includePantryList,
						searchName: this.searchName,
					})
				}, 400);
			},
			loadMore() {
				window.onscroll = () => {
					const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight;
					const closeToBottom = document.documentElement.offsetHeight * 0.95;
					// First check if it is currently loading new DOM elements so multiple calls aren't
					// Issued, then see if we are at the end of the screen (95%)
					if (this.currentLoadingStatus === false && bottomOfWindow >= closeToBottom) {
						this.offset += 25;
						this.getRecipes({
							includeShoppingList: this.includeShoppingList,
							includePantryList: this.includePantryList,
							searchName: this.searchName,
							offset: this.offset,
						});
					}
				};
			},
			close() {
				this.$router.push({name: 'recipes'})
			}
		},
		created() {
			this.$emit('title', 'Pantry');
		},
		mounted() {
			// Listener for reaching end of page
			this.loadMore();
		},
	}
</script>

<style scoped>
	.recipe-modal {
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
	}

	.prepend-icon {
		position: absolute;
		z-index: 9999;
		display: block;
		width: 2.375rem;
		height: 2.375rem;
		line-height: 2.375rem;
		text-align: center;
		pointer-events: none;
		color: #aaa;
	}

	.input-group input {
		padding-left: 2.375rem;
	}
</style>
