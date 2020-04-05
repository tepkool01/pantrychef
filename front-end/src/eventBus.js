// Hold an eventBus for alerts/error messages
import Vue from 'vue';

export const EventBus = new Vue({
	methods: {
		setAlert(type, severity, message) {
			this.$emit('alert', { type, severity, message });
		},
	},
});