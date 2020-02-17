import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'

const UserPoolId = 'us-east-1_895IYJN1N'
const ClientId = '1f4k0ktrcbthkq7foan121c9sq'

const poolData = {
	UserPoolId: UserPoolId,
	ClientId: ClientId
}

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

export default {
	logout(cognitoUser) {
		cognitoUser.signOut()
	},

	updatePassword(cognitoUser, newPassword, oldPassword) {
		cognitoUser.changePassword(oldPassword, newPassword, function(
			err,
			result
		) {
			if (err) {
				alert(err.message)
				return
			}
			return result
		})
	},

	register(username, password, email) {
		var attributeList = []

		var dataEmail = {
			Name: 'email',
			Value: email
		}

		var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
			dataEmail
		)

		attributeList.push(attributeEmail)

		userPool.signUp(username, password, attributeList, null, function(
			err,
			result
		) {
			if (err) {
				alert(err.message)
				return
			}
			return result
		})
	},

	authenticate(username, password) {
		var authenticationData = {
			Username: username,
			Password: password
		}
		var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
			authenticationData
		)
		var userData = {
			Username: username,
			Pool: userPool
		}
		var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function(result) {
				// eslint-disable-next-line no-unused-vars
				var accessToken = result.getAccessToken().getJwtToken()
				AWS.config.region = 'us-east-1'
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId:
						'us-east-1:d7ab3904-42a7-4f17-967d-0877b9ff6fed', // your identity pool id here
					Logins: {
						// Change the key below according to the specific region your user pool is in.
						'cognito-idp.us-east-1.amazonaws.com/us-east-1_895IYJN1N': result
							.getIdToken()
							.getJwtToken()
					}
				})

				//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
				AWS.config.credentials.refresh(error => {
					if (error) {
						alert(error)
					}
				})
				return cognitoUser
			},

			onFailure: function(err) {
				alert(err.message)
			},

			newPasswordRequired: function(userAttributes) {
				// User was signed up by an admin and must provide new
				// password and required attributes, if any, to complete
				// authentication.

				// the api doesn't accept this field back
				delete userAttributes.email_verified

				//TODO: write code here for actual use case.
				// store userAttributes on global variable
				var sessionUserAttributes = userAttributes
				cognitoUser.completeNewPasswordChallenge(
					'NewPassword1',
					sessionUserAttributes
				)
			}
		})
	}
}
