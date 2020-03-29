import { Selector } from 'testcafe';


fixture `Settings`
	.page `http://localhost:8080`;

test('Change Password Test', async t => {

	await t
		.typeText('#login_user_input_box','TestUsername')
		.typeText('#login_password_input_box','TestPassword1');

	await t
		.click('#login_submission_button')
		.click('#settings_sidepanel_button')
		.click('#update_password_button')
		.typeText('#update_password_modal_verify_input','TestPassword1')
		.typeText('#update_password_modal_password_input','TestPassword2')
		.typeText('#update_password_modal_repassword_input','TestPassword2');

	await t
		.click('#click_ok_button')

});
