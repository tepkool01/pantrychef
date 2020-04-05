module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
    ],
    transform: {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/components/*.{js,vue}",
        "src/views/*.{js,vue}",
        "src/components/modals/*.{js,vue}",
        "src/store/*.{js}"
    ],
    
    coverageDirectory: "tests/reports/",
    coverageReporters: [
        "html",
        "text-summary"
    ],
}
