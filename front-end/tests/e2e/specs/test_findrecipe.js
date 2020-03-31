import { Selector } from 'testcafe'

fixture`Pantry Chef`.page`http://localhost:8080`

test('Find Recipe test', async t => {
	await t
		.typeText('#login_user_input_box', 'TestUsername')
		.typeText('#login_password_input_box', 'TestPassword1')
		.click('#login_submission_button')
		.debug()
		.click('#recipe_sidepanel_button')
		.debug()
		.expect(Selector('h4').withText('Another Stuffed Mushroom').exists).ok();
})
