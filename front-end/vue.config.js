module.exports = {
	// prevent irritating lint on save
	lintOnSave: process.env.NODE_ENV === 'production',
	chainWebpack: config => {
		const path = require('path')

		if (process.env.NODE_ENV !== 'production') {
			config.devtool('eval')
			config.module
				.rule('istanbul')
				.test(/\.(js|vue)$/)
				.enforce('post')
				.include.add(path.resolve(__dirname, '/src'))
				.end()
				.use('istanbul-instrumenter-loader')
				.loader('istanbul-instrumenter-loader')
				.options({ esModules: true })
		}
	}
}
