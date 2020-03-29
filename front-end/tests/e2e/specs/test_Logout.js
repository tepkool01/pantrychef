import { Selector } from 'testcafe';

fixture`Pantry Chef`.page`http://localhost:8080`

test('Logout test', async t => {
    await t

        .typeText(Selector('#login_user_input_box'), 'TestUsername')
        .typeText(Selector('#login_password_input_box'), 'TestPassword1')
        .click('#login_submission_button')
        .click(Selector('#__BVID__14__BV_button_'))
        .click(Selector('#logoutButton'))
});