import { Selector } from 'testcafe';


fixture `Getting Started`
    .page `http://localhost:8080`;

const nameInput = Selector('#login_user_input_box');
const pwInput   = Selector('#login_password_input_box');

test('Add Ingredient', async t => {
    await t
	.typeText(nameInput,'ecortez1')
        .typeText(pwInput,'Ericdean1!')
        .expect(nameInput.value).eql('ecortez1')

   await t
        .click('#login_submission_button');
    await t
        .click('#pantry_sidepanel_button');


});
