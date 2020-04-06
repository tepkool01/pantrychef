module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
    verbose: true,
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/components/*.{js,vue}",
        "src/views/*.{js,vue}",
        "src/components/modals/*.{js,vue}",
        "src/store/*.{js}",
		"src/store/modules/*.{js}",
    ],
    
    coverageDirectory: "tests/reports/",
    coverageReporters: [
        "html",
        "text-summary",
    ],
	"modulePaths": [
		"./src",
	],
};