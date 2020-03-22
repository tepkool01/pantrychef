<template>
    <b-alert
      :show=true
      dismissible
      variant="danger"
    >
      {{errorList}}
    </b-alert>
</template>


<script>
export default {
	name: 'errorbar',
	props: {
		errorList: {
			type: String,
			required: true
		}
	}
}
</script>


<style scoped></style>