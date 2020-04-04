import { Selector } from 'testcafe';


fixture `Settings`
	.page `http://localhost:8080`;

test('Delete Profile Test', async t => {
	const profilelist = Selector('#profile_list');
	await t
		.typeText('#login_user_input_box','TestUsername')
		.typeText('#login_password_input_box','TestPassword1');

	await t
		.click('#login_submission_button')
		.click('#settings_sidepanel_button')
		.click('#settings_preferences_tab___BV_tab_button__')
		.expect(profilelist.textContent).contains('TestPantry')
		.click(profilelist.withText)
});
