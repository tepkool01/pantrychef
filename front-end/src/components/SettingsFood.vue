<template>
	<div>
		<div class="row">
			<div class="col-lg-12">
				<h2 class="mt-3">Food Preferences</h2>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-lg-12 settings--section-label">
				Manage diet
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				Dietary preference
			</div>
			<div class="col-lg-6">
				<b-form-select class="form-control" aria-label="Diet Type">
					<option>No Preference</option>
					<option>Vegetarian</option>
					<option>Vegan</option>
					<option>Gluten Free</option>
					<option>Paleo</option>
				</b-form-select>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-lg-12 settings--section-label">
				Recipe search
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				Include ingredients not currently in my pantry
			</div>
			<div class="col-lg-6">
				<b-form-checkbox size="lg"></b-form-checkbox>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SettingsFood'
}
</script>

<style scoped>
.settings--section-label {
	font-size: 10px;
	font-weight: 700;
	letter-spacing: 0.5px;
	line-height: 12px;
	text-transform: uppercase;
	border-bottom: 2px solid #edeff1;
	color: #7c7c7c;
	margin-bottom: 32px;
	padding-bottom: 6px;
}
</style>
