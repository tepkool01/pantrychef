import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import axios from "axios";

const poolData = {
	UserPoolId: 'us-east-1_FfJ4ffeia',
	ClientId: '2lk7bjr0akm1ncuo8i8piqv33g'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export default {
	getUserInfo() {
		return axios.get('/user')
	},
	updateUser(payload) {
		return axios.patch('/user', payload)
	},
	logout() {
		this.getUser().signOut()
	},
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
						userId: this.getUser().getUsername(),
						cognitoUser: this.getUser()
					})
				} else {
					// do something
					reject('Could not locate user.')
				}
			})
		})
	},

	forgotPassword(username) {
		let cognitoUser = this.setupCognitoUser(username)
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
		let cognitoUser = this.setupCognitoUser(username)
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

	updatePassword(username, newPassword, oldPassword) {
		let cognitoUser = this.setupCognitoUser(username)
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
		};
		let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
		let cognitoUser = this.setupCognitoUser(username);
		return new Promise((resolve, reject) => {
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess (result) {
					resolve({
						userId: cognitoUser.getUsername(),
						accessToken: result.getAccessToken().getJwtToken(),
						refreshToken: result.getRefreshToken().getToken(),
						idToken: result.getIdToken().getJwtToken(),
						cognitoUser: cognitoUser
					})
				},

				onFailure (err) {
					reject(err.message)
				},

				newPasswordRequired (userAttributes) {
					// User was signed up by an admin and must provide new
					// password and required attributes, if any, to complete
					// authentication.

					// the api doesn't accept this field back
					delete userAttributes.email_verified;

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
	},
	setupCognitoUser(username) {
		return new AmazonCognitoIdentity.CognitoUser({
			Username: username,
			Pool: userPool
		})
	}
}
