import { Selector } from 'testcafe';


fixture `Getting Started`
    .page `http://localhost:8080`;

test('My first test', async t => {
    await t
        .expect('ok').notOk('ok')
	.typeText('#login_user_input_box','anthrwrld')
        .typeText('#login_password_input_box','Testing123');

    await t
        .click('#login_submission_button');

});
