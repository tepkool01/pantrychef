<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h1 class="mt-4">Pantry</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-10 offset-1">
				<div class="card-deck">

					<div class="card m-4">
						<div class="card-header">
							<h5 class="card-title">
								List of the Ingredients
							</h5>
						</div>
						<div class="card-body my-2">
							<div v-for="item in pantryList" v-bind:key="item.name">
								<Pantry :pantryList="item" :key="item.id"></Pantry>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Pantry from '@/components/Pantry.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Pantry',
	computed: {
		...mapGetters('pantry', {
			pantry: 'pantry'
		})
	},
	components: {
		Pantry
	},
	methods: {
		...mapActions('pantry', {
			getPantryList: 'getPantryList'
		})
	},
	created() {
		console.log("Created?")
		this.getPantryList()
		this.$emit('title', 'Pantry')
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
