<template>
	<div id="app">
		<!-- Todo, rethink this aside from pageTitle -->
		<div
			class="login d-flex"
			id="wrapper"
			:class="{ toggled: toggle }"
			v-if="isAuthenticated && pageTitle !== 'Home'"
		>
			<!-- Sidebar -->
			<div class="border-right" id="sidebar-wrapper">
				<div class="sidebar-heading">Welcome back, {{ userId }}</div>
				<div class="sidebar--diet-type mb-5">Vegetarian</div>
				<!--TODO: Bind dietType data here-->

				<select @change="switchProfile">
					<option></option>
					<option v-for="p in profiles" :value="p.id" :selected="p.id == activeProfile">{{p.profile_name}} ({{p.id}})</option>
				</select>
				<div class="list-group list-group-flush">
					<a
						href="/pantry"
						class="list-group-item list-group-item-action"
						><b-icon icon="house"></b-icon> Pantry</a
					>
					<a
						href="/ingredients"
						class="list-group-item list-group-item-action"
						><b-icon icon="list-check"></b-icon> Ingredients</a
					>
					<a
						href="/recipes"
						class="list-group-item list-group-item-action"
						><b-icon icon="book"></b-icon> Recipes</a
					>
					<a
						href="/settings"
						class="list-group-item list-group-item-action"
						><b-icon icon="gear"></b-icon> Settings</a
					>
				</div>
			</div>
			<!-- /#sidebar-wrapper -->
			<!-- Page Content -->
			<div id="page-content-wrapper">
				<nav class="navbar navbar-expand-lg">
					<button
						class="btn btn-sm btn-outline-light mr-4"
						id="menu-toggle"
						@click="toggle = !toggle"
					>
						<b-icon icon="three-dots-vertical"></b-icon>
					</button>
					<a class="navbar-brand">Pantry Chef</a>

					<div
						class="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul class="navbar-nav ml-auto mt-2 mt-lg-0">
							<b-nav-item-dropdown :text="userId" right>
								<b-dropdown-item
									href=""
									id="logoutButton"
									@click="onLogout"
									v-if="isAuthenticated"
									>Logout</b-dropdown-item
								>
							</b-nav-item-dropdown>
						</ul>
					</div>
				</nav>
				<div class="container-fluid">
					<router-view @title="pageTitle = $event" />
				</div>
			</div>
		</div>

		<div v-else>
			<router-view @title="pageTitle = $event" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'app',
	data() {
		return {
			pageTitle: '',
			toggle: false
		}
	},
	computed: {
		...mapGetters('users', {
			isAuthenticated: 'isAuthenticated',
			userId: 'userId'
		}),
		...mapGetters('profile', {
			profiles: 'profiles',
			aProfile: 'activeProfile'
		}),
		activeProfile: {
			get: function() {
				return this.aProfile
			},
			set: function(newProfile) {
				this.activateProfile(newProfile)
			}
		}
	},
	watch: {
		pageTitle(val) {
			document.title = 'Pantry Chef - ' + val
		}
	},
	methods: {
		...mapActions('users', {
			logout: 'logout'
		}),
		...mapActions('profile', {
			activateProfile: 'activateProfile'
		}),
		switchProfile(profile) {
			this.activateProfile(profile.target.value)
		},
		onLogout() {
			// Invalidate the session
			this.logout()

			// Navigate back to home page
			this.$router.replace('/')
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #889099;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

.input--error {
	border-color: red !important;
	border-width: medium !important;
}

#sidebar-wrapper {
	min-height: 100vh;
	margin-left: -15rem;
	-webkit-transition: margin 0.25s ease-out;
	-moz-transition: margin 0.25s ease-out;
	-o-transition: margin 0.25s ease-out;
	transition: margin 0.25s ease-out;
	background-color: #5b6976;
}

#sidebar-wrapper .sidebar-heading {
	padding: 0.875rem 1.25rem;
	font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
	width: 15rem;
}

#page-content-wrapper {
	min-width: 100vw;
}
#wrapper.toggled #sidebar-wrapper {
	margin-left: 0;
}

@media (min-width: 768px) {
	#sidebar-wrapper {
		margin-left: 0;
	}

	#page-content-wrapper {
		min-width: 0;
		width: 100%;
	}

	#wrapper.toggled #sidebar-wrapper {
		margin-left: -15rem;
	}
}

#sidebar-wrapper .list-group-item {
	background-color: #5b6976;
	color: #c0c9d2;
}

#sidebar-wrapper .list-group-item:hover {
	background-color: #507d72;
}

.sidebar-heading {
	color: #c0c9d2;
}

.border-right {
	border: 1px solid #5b6976 !important;
}

.navbar {
	background-color: #334049;
}

.navbar-brand {
	font-size: 1.6rem;
	font-weight: 800;
	color: #d6dde4;
}

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
