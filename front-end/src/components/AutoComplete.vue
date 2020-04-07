<template>
	<div>
		<span class="prepend-icon">
			<b-icon-search></b-icon-search>
		</span>
		<input
			:id="'ingredient_search_' + componentTitle"
			type="text"
			autocomplete="off"
			class="form-control"
			v-model="queryStr"
			@focus="modal = true"
			placeholder="Search..."
			style="padding-left: 2.375rem;"
		>
		<div class="itemView shadow" v-if="suggestions && modal">
			<ul class="list-group">
				<li class="list-group-item list-group-item-action" v-for="suggestion in suggestions" @click="setState(suggestion)" :key="suggestion.id">
					{{suggestion[objectAttribute]}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		suggestionsMstr: {
			type: Array,
			required: true,
		},
		objectAttribute: {
			type: String,
			required: true,
		},
		componentTitle: {
			type: String,
			required: true,
		},
		toolTip: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			queryStr: '',
			suggestions: [],
			modal: false,
		};
	},
	methods: {
		matches() {
			if (this.queryStr.length === 0) {
				this.suggestions = [];
			} else {
				this.suggestions = this.suggestionsMstr.filter(
					(object) => object[this.objectAttribute].toLowerCase().startsWith(this.queryStr.toLowerCase()),
				);
			}
		},
		setState(suggestion) {
			this.queryStr = suggestion[this.objectAttribute];
			this.$emit('selection', suggestion);
			this.modal = false;
		},
	},
	mounted() {
		this.matches();
	},
	watch: {
		queryStr() {
			this.matches();
		},
	},
};
</script>


<style scoped>
    .itemView {
        cursor: pointer;
		max-height: 400px;
		z-index: 9999;
		overflow: scroll;
		border-radius: .25rem;
    }

	.prepend-icon {
		position: absolute;
		z-index: 2;
		display: block;
		width: 2.375rem;
		height: 2.375rem;
		line-height: 2.375rem;
		text-align: center;
		pointer-events: none;
		color: #aaa;
	}
</style>
