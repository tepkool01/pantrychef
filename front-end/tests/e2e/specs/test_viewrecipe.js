import { Selector } from 'testcafe';


fixture `Getting Started`
    .page `http://localhost:8080`;

test('View Recipe test', async t => {
    await t

	.typeText('#login_user_input_box','ecortez1')
        .typeText('#login_password_input_box','Ericdean1!');

    await t
        .click('#login_submission_button');
    await t
        .click('#recipe_sidepanel_button');
    await t
        .click('#view_recipe_submission_button');
    //Todo: add logic to verify view recipe page loaded and related gui events

});
