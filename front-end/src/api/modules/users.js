import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'

//TODO: move this to a better place
const UserPoolId = 'us-east-1_DEgBJUPlO'
const ClientId = '426724im0ednh2pdrpr7r02ove'

const poolData = {
	UserPoolId: UserPoolId,
	ClientId: ClientId
}

let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

//TODO: Fix this location
function setupCongnitoUser(username) {
	return new AmazonCognitoIdentity.CognitoUser({
		Username: username,
		Pool: userPool
	})
}

export default {
	logout() {
		this.getUser().signOut()
	},
	//TODO: Fix this location
	getUser() {
		return userPool.getCurrentUser()
	},

	getUserSession() {
		return new Promise((resolve, reject) => {
			this.getUser().getSession((err, session) => {
				if (err) {
					// do something
					reject(err)
				} else if (session.isValid()) {
					// Valid session
					resolve({
						idToken: session.getIdToken().getJwtToken(),
						refreshToken: session.getRefreshToken().getToken(),
						accessToken: session.getAccessToken().getJwtToken(),
						userId: this.getUser().getUsername()
					})
				} else {
					// do something
					reject('Could not locate user.')
				}
			})
		})
	},

	forgotPassword(username) {
		let cognitoUser = setupCongnitoUser(username)
		return new Promise((resolve, reject) => {
			cognitoUser.forgotPassword( {
				onSuccess: function (data) {
					// successfully initiated reset password request
					// eslint-disable-next-line no-console
					console.log('CodeDeliveryData from forgotPassword: ' + data)
					resolve(data)
				},
				onFailure: function (err) {
					reject(err.message)
				}
			})
		})
	},
	forgotPasswordVerification(username, code, newPassword) {
		let cognitoUser = setupCongnitoUser(username)
		return new Promise((resolve, reject) => {
			cognitoUser.confirmPassword(code, newPassword, {
				onSuccess: function (data) {
					resolve(data)
				},
				onFailure: function (err) {
					reject(err)
				}
			})
		})
	},

	updatePassword(cognitoUser, newPassword, oldPassword) {
		return new Promise((resolve, reject) => {
			cognitoUser.changePassword(oldPassword, newPassword, function(
				err,
				result
			) {
				if (err) {
					reject(err.message)
				}
				resolve(result)
			})
		})
	},

	register(username, password, email) {
		let attributeList = []

		let dataEmail = {
			Name: 'email',
			Value: email
		}

		let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
			dataEmail
		)

		attributeList.push(attributeEmail)

		return new Promise((resolve, reject) => {
			userPool.signUp(username, password, attributeList, null, function(
				err,
				result
			) {
				if (err) {
					reject(err.message)
				}
				resolve(result)
			})
		})
	},

	authenticate(username, password) {
		let authenticationData = {
			Username: username,
			Password: password
		}
		let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
			authenticationData
		)
		let cognitoUser = setupCongnitoUser(username)
		return new Promise((resolve, reject) => {
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function(result) {
					// eslint-disable-next-line no-unused-vars
					AWS.config.region = 'us-east-1'
					AWS.config.credentials = new AWS.CognitoIdentityCredentials(
						{
							IdentityPoolId:
								'us-east-1:d7ab3904-42a7-4f17-967d-0877b9ff6fed', // your identity pool id here
							Logins: {
								// Change the key below according to the specific region your user pool is in.
								'cognito-idp.us-east-1.amazonaws.com/us-east-1_DEgBJUPlO': result
									.getIdToken()
									.getJwtToken()
							}
						}
					)

					//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
					// todo: actually needed?
					AWS.config.credentials.refresh(error => {
						if (error) {
							reject(error)
						}
					})
					resolve({
						userId: cognitoUser.getUsername(),
						accessToken: result.getAccessToken().getJwtToken(),
						refreshToken: result.getRefreshToken().getToken(),
						idToken: result.getIdToken().getJwtToken()
					})
				},

				onFailure: function(err) {
					reject(err.message)
				},

				newPasswordRequired: function(userAttributes) {
					// User was signed up by an admin and must provide new
					// password and required attributes, if any, to complete
					// authentication.

					// the api doesn't accept this field back
					delete userAttributes.email_verified

					//TODO: write code here for actual use case.
					// store userAttributes on global letiable
					let sessionUserAttributes = userAttributes
					cognitoUser.completeNewPasswordChallenge(
						'NewPassword1',
						sessionUserAttributes
					)
				}
			})
		})
	}
}
