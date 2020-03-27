import { Selector } from 'testcafe';


fixture `Getting Started`
    .page `http://localhost:8080`;

test('Find Recipe test', async t => {
    await t

	.typeText('#login_user_input_box','ecortez1')
        .typeText('#login_password_input_box','Ericdean1!');

    await t
        .click('#login_submission_button');
    await t
        .click('#recipe_sidepanel_button');
//Todo: add logic to verify find recipe page loaded and related gui events
});
