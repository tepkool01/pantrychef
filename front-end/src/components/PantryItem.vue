<template>
	<div class="Pantry">
		{{ pantryItem }}
	</div>
</template>

<script>
export default {
	name: 'Pantry',
	props: {
		pantryItem: Object,
	},
};
</script>

<style scoped></style>
