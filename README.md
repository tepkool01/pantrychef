# pantrychef
Uncover recipes from ingredients in your cabinet

## Environment
1. Using Webstorm 2019.3.2 for Windows
2. Installed NPM version 6.13.6
3. Installed NodeJS version 12.14.1
4. Install vue-cli-service type "npm i -g @vue/cli"
5. Install vue add unit-mocha 
6. Install chai; type npm install chai
7. Install mocha dev; npm install mocha chai --save-dev
8. Install init,click enter on everything; npm init
9. From tests/mochaTests Run test; npm run test
9. Mocha & Chai Unit Testing Frameworks ; Cypress for E2E testing
10. ESLinter = Prettier

## Linting
1. Prettier rules are located in .prettierrc.js
2. eslint configuration is in .eslintrc.js (which uses prettier)
3. To run eslint natively on the command line, one way is to install all the packages globally, i.e.:
- `npm install @vue/eslint-config-prettier -g`
- `npm install eslint-plugin-prettier -g`
- `npm install eslint-plugin-vue -g`
- `npm install prettier -g`
- `npm install eslint -g`
4. Then run `eslint YOUR_FILE`
or autofix using
5. `eslint --fix YOUR_FILE`

## Running
1. `cd pantry-chef`
2. `npm run serve`

## Building
1. `cd pantry-chef`
2. `npm run build`

## Testing
- Highly recommend install the chai, mocha, sinon, and etc libraries for easier autocompletion (jetbrains settings)

## Fun Tips
1. Using `vue ui` you can get to the UI manager for this application. You'll need to import the `pantry-chef` folder as a project first.
2. Use terminal window in webstorm to install mocha and chai.
## References / Resources
https://www.vuemastery.com/courses/real-world-vue-js/vue-cli/ (followed this to create the project)

##Notes
Chai is the testing environment and chai is the assertion library.
