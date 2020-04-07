<template>
    <div>
        <input
                :id="'ingredient_search_' + componentTitle"
                type="text"
                autocomplete="off"
                v-model="queryStr"
                @focus="modal = true"
        >
        <div class="itemView shadow" v-if="suggestions && modal">
            <ul class="list-group" style="list-style-type:none">
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
</style>
