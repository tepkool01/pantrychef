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
        .typeText('#ingredient_search_Ingredient');



});
