# pantrychef
Uncover recipes from ingredients in your cabinet

## Environment
1. Using Webstorm 2019.3.2 for Windows
2. Installed NPM version 6.13.6
3. Installed NodeJS version 12.14.1
4. Install vue-cli-service type "npm i -g @vue/cli"
5. Install vue add unit-mocha 
6. Install init,click enter on everything; npm init
7. From front-end/ Run test; npm run test:unit
8. ESLinter = Prettier

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
- Highly recommend install the sinon and etc libraries for easier autocompletion (jetbrains settings)
- do `npm run tester` to get code coverage reports


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
2. https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en - the VueJS chrome plugin is invaluable-- I use it to check the 'state' (store) of the application.
## References / Resources
https://www.vuemastery.com/courses/real-world-vue-js/vue-cli/ (followed this to create the project)
https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html -- for creating triggers on Cognito events


## Resources created, but not contained within infrastructure yaml
- Route 53 DNS
- SES (email)
- Secrets Manager
- CloudFront (CDN)


# Installing system for first time
1. Go to cognito after running the template, and set up custom domain
