<template>

<div class="about flex flex-col">
    <label v-b-tooltip.hover.left v-bind:title="toolTip"
        for="lfname">{{componentTitle}}: </label> 
    <input type="text" class="bg-gray-300 px-4 py-2" autocomplete="off"  
        v-model="queryStr" @focus="modal = true">
    <div class="itemView" v-if="suggestions && modal">
        <ul class="bg-gray-40 px-4 py-2" style="list-style-type:none">
            <li v-for="suggestion in suggestions" @click="setState(suggestion)">
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
            required: true
          },
          objectAttribute: {
              type: String,
              required: true
          },
          componentTitle:{
              type: String,
              required: true
          },
          toolTip:{
              type: String,
              required: true
          }
      },

    data: function() {
            return{
            queryStr:'',
            suggestions:[],
            modal: false
            }
    },
    methods: {
 		matches(){
		  if(this.queryStr.length == 0){
			  this.suggestions=[]
		  }else{
			this.suggestions = this.suggestionsMstr.filter( object => {
				return object[this.objectAttribute].toLowerCase().startsWith(this.queryStr.toLowerCase())
			});
		  }
		}, 
        setState(suggestion){
            this.queryStr=suggestion[this.objectAttribute]
            this.$emit('selection',suggestion['id'])
            this.modal=false
        }
    },
    mounted() {
        this.matches()
    },
    watch: {
        queryStr() {
            this.matches()
        }
    }

  }
</script>



<style scoped>
.itemView{
	font-size: 15px;
	font-weight: 700;
	letter-spacing: 0.5px;
	line-height: 30px;
	text-transform: uppercase;
	border-bottom: 2px solid #edeff1;
	margin-bottom: 32px;
	padding-bottom: 6px;
    cursor: pointer;
    color: grey;
    align: center;
    
}
</style>