import { Selector } from 'testcafe'

fixture`Pantry Chef`.page`http://localhost:8080`

test('View Recipe Test', async t => {
	await t
		.typeText('#login_user_input_box', 'TestUsername')
		.typeText('#login_password_input_box', 'TestPassword1')
		.click('#login_submission_button')
		.debug()
		.click('#recipe_sidepanel_button')
		.debug()
		.click(Selector('.recipe-card--view').find('button').withText('View Recipe'))
		.expect(Selector('h1').withText('View Recipe').exists).ok();
})
