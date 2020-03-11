<template>
	<div class="Pantry">
		{{ pantryItem.name }} ({{ pantryItem.id }})
	</div>
</template>

<script>
export default {
	name: 'Pantry',
	props: {
		pantryItem: Object
	}
}
</script>

<style scoped></style>
