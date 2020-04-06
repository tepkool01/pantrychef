<template>
    <b-alert :show=true dismissible :variant="variant">
        <div class="detail-block">
            <label class="err-type">{{ type }}</label>: <span class="err-msg">{{ msg }}</span>
        </div>
    </b-alert>
</template>


<script>
	export default {
		name: 'Error',
		props: {
			msg: {
				type: String,
				default: 'There has been an error, please refresh the page.',
			},
			severity: {
				type: Number,
				default: 1,
			},
			type: {
				type: String,
				default: 'Error',
				validator: (val) => ['Error', 'Info', 'Warning'].includes(val),
			},
		},
        computed: {
			variant() {
				switch (this.type) {
					case 'Error':
						return 'danger';
                    case 'Info':
                    	return 'info';
                    case 'Warning':
                    	return 'warning';
                }
            },
        },
	};
</script>


<style scoped>
label {
    font-weight: 700;
}

.detail-block {
    display: block;
}
.alert {
    margin-bottom: 0 !important;
}
</style>
