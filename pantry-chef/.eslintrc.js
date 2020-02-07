module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "@vue/prettier"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		indent: ["error", "tab"]
	},
	parserOptions: {
		parser: "babel-eslint"
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)"],
			env: {
				mocha: true
			}
		},
		{
			files: ["**/__tests__/*.{j,t}s?(x)"],
			env: {
				mocha: true
			}
		},
		{
			files: ["**/__tests__/*.{j,t}s?(x)"],
			env: {
				mocha: true
			}
		}
	]
};
