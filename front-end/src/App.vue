<template>
	<div id="app">
        <!-- Error messaging -->
        <Error v-if="Object.keys(alertObj).length !== 0"
               :msg="alertObj.message"
               :severity="alertObj.severity"
               :type="alertObj.type"
        />

		<div
			class="login d-flex"
			id="wrapper"
			:class="{ toggled: toggle }"
			v-if="isAuthenticated && pageTitle !== 'Home'"
		>
			<!-- Sidebar -->
			<div class="border-right" id="sidebar-wrapper">
				<div class="sidebar-heading">Welcome back, {{ userId }}</div>
				<div class="sidebar--diet-type mb-5">{{ userMealPreference.name }}</div>

                <b-form-select
                        id="dropdown-1"
                        size="sm"
                        class="mt-0"
                        variant="light"
                        v-model="activeProfile"
                        :options="profiles"
                >
                </b-form-select>
				<div class="list-group list-group-flush">
					<a
						href="/pantry"
						id="pantry_sidepanel_button"
						class="list-group-item list-group-item-action"
						><b-icon icon="house"></b-icon> Pantry</a
					>
					<a
						href="/recipes"
						id="recipe_sidepanel_button"
						class="list-group-item list-group-item-action"
						><b-icon icon="book"></b-icon> Recipes</a
					>
					<a
						href="/settings"
						id="settings_sidepanel_button"
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
import { mapActions, mapGetters } from 'vuex';
import { EventBus } from './eventBus';
import Error from './components/Error.vue';

export default {
	name: 'app',
    components: {
		Error,
    },
	data() {
		return {
			pageTitle: '',
			toggle: false,
			alertObj: {},
			alertTimeout: null,
		}
	},
	computed: {
		...mapGetters('users', {
			isAuthenticated: 'isAuthenticated',
			userId: 'userId',
			userMealPreference: 'userMealPreference',
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
		},
	},
	watch: {
		pageTitle(val) {
			document.title = 'Pantry Chef - ' + val
		},
		// Close out alert component after 8 seconds
		alertObj(val) {
			if (val.message !== undefined) {
				clearTimeout(this.alertTimeout);
				this.alertTimeout = setTimeout(() => {
					this.alertObj = {};
				}, 8000);
			}
		},
	},
	methods: {
		...mapActions('users', {
			logout: 'logout'
		}),
		...mapActions('profile', {
			activateProfile: 'activateProfile',
		}),
		onLogout() {
			// Invalidate the session
			this.logout();

			// Navigate back to home page
			this.$router.replace('/')
		},
	},
    created() {
		// Message bus across all components/views that handles all of the error information
		EventBus.$on('alert', (alertObj) => {
			this.alertObj = alertObj;
		});
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
#nprogress .bar {
    height: 8px !important;
}
</style>
