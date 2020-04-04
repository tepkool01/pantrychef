import { Selector } from 'testcafe';


fixture `Settings`
	.page `http://localhost:8080`;

test('Create Profile Test', async t => {

	await t
		.typeText('#login_user_input_box','TestUsername')
		.typeText('#login_password_input_box','TestPassword1');

	await t
		.click('#login_submission_button')
		.click('#settings_sidepanel_button')
		.click('#settings_profile_tab___BV_tab_button__')
		.typeText('#profile_create_name','TestPantry')
		.click('#profile_create_button');

});
