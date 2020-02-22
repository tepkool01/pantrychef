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
							<h5 class="card-title">Create a Profile</h5>
						</div>
						<div class="card-body my-2">
							<profile-create></profile-create>
						</div>
					</div>

					<div class="card m-4">
						<div class="card-header">
							<h5 class="card-title">
								Select an existing profile
							</h5>
						</div>
						<div class="card-body my-2">
							<div v-for="p in profiles" v-bind:key="p.name">
								<profile :profile="p"></profile>
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
import Profile from '@/components/Profile.vue'
import ProfileCreate from '../components/ProfileCreate'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Profiles',
	computed: {
		...mapGetters('profile', {
			profiles: 'profiles'
		})
	},
	components: {
		Profile,
		ProfileCreate
	},
	methods: {
		...mapActions('profile', {
			getProfiles: 'getProfiles'
		})
	},
	created() {
		this.getProfiles()
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
