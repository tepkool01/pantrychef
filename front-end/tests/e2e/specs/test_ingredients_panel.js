import { Selector } from 'testcafe';


fixture `Getting Started`
    .page `http://localhost:8080`;

test('View Recipe test', async t => {
    await t

	.typeText('#login_user_input_box','TestUsername')
        .typeText('#login_password_input_box','TestPassword1');

    await t
        .click('#login_submission_button');
    await t
        .click('#ingredients_sidepanel_button');
    await t
        //Todo: add logic to verify ingredient page loaded
test('Test for adding ingredient', async t => {
    const ingredientNameInput = Selector('#ingredient_input_box');
//Todo: need to verify if Shopping List is empty
    await t
    .expect(ingredientNameInput.value).eql('', 'input is empty');
    await t
    .typeText(ingredientNameInput, 'Pickle');
    await t
        .click('#ingredient_found_submission_button');
    // await t  Todo: need to verify if Pickle is in Shopping List
    // .expect(ingredientNameInput.value).contains('Pickle', 'input contains text "Pickle"');

});
