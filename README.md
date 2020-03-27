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
* Note, you can also run this using the local system using `npx eslint FILENAME --fix`
## Running
1. `cd front-end`
2. `npm run serve`
3. Note: if an error occurs then run, `npm install`

## Building
1. `cd front-end`
2. `npm run build`
3. Note: if an error occurs then run, `npm install`

## Testing
- Highly recommend install the chai, mocha, sinon, and etc libraries for easier autocompletion (jetbrains settings)
- do `npm run tester` to get code coverage reports
##GUI Testing
- TestCafe, is being used. This application utilizes google chrome and tests the GUI End2End (E2E) Functionality.
1. To install Testcafe type in the terminal "npm install -g testcafe"
2. Then open another terminal in webstorm, press the "+" and make sure you are in the .../pantryChef/front-end directory.
3. Type "npm run serve", inorder to make sure a local instance of the application is running.
4. Then in another terminal cd into the .../pantryChef/front-end/tests/e2e/specs directory.
5. Then to run the testcafe GUI test type in the terminal "testcafe chrome test1.js"
6. This will launch the testcafe script for the *.js test.


### Python (backend) Unit Testing
- In JetBrain's PyCharm (I'm using the 2019 latest version), go to bottom right and configure the interpreter. This will create your virtual environment.
- Before launching the pycharm application make sure the environement variable is set for PYTHONPATH.
- PYTHONPATH should be set to your workspace directory in webstorm. For example "C:\psuWorkspace\pantryWorkspace\pantrychef\back-end\lambdas" 
- Then launch Pycharm and go to the bottom window ->click Terminal and cd to your webstorm directory.
- Run `pip install pytest`
- Run `pip install pytest-cov`
- Go to your project folder, i.e. `cd back-end/lambdas/profiles` (or go to new-user, or whichever lambda)
- Run `pytest` and you'll see the results, which are located in the relative `tests/unit` folder
- To get coverage reports, do `pytest --cov-report term --cov=profiles tests/` while you are in the profiles (or other lambda) directory
- To get an HTML report, just change `term` to `html` in the above command. Viola!

## Fun Tips
1. Using `vue ui` you can get to the UI manager for this application. You'll need to import the `pantry-chef` folder as a project first.
2. Use terminal window in webstorm to install mocha and chai.
3. https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en - the VueJS chrome plugin is invaluable-- I use it to check the 'state' (store) of the application.
## References / Resources
https://www.vuemastery.com/courses/real-world-vue-js/vue-cli/ (followed this to create the project)
https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html -- for creating triggers on Cognito events

##Notes
Chai is the testing environment and chai is the assertion library.


## Resources created, but not contained within infrastructure yaml
- Route 53 DNS
- SES (email)
- Secrets Manager
- CloudFront (CDN)


# Installing system for first time
1. Go to cognito after running the template, and set up custom domain