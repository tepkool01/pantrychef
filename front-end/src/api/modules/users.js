import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import axios from "axios";
import store from "../../store";

const poolData = {
	UserPoolId: 'us-east-1_FfJ4ffeia',
	ClientId: '2lk7bjr0akm1ncuo8i8piqv33g'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export default {
	getUserInfo() {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/user', config)
	},
	async updateUser(payload) {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		try {
			const result = await axios.patch('/user', payload, config);
			return Promise.resolve(result);
		} catch (e) {
			return Promise.reject(e);
		}
	},
	/* istanbul ignore next */
	logout() {
		this.getUser().signOut()
	},
	getUser() {
		return userPool.getCurrentUser()
	},
	/* istanbul ignore next */
	getUserSession() {
		return new Promise((resolve, reject) => {
			const user = this.getUser();
			if (user == null) {
				reject('No active session');
			} else {
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
			}
		})
	},

	/* istanbul ignore next */
	forgotPassword(username) {
		let cognitoUser = this.setupCognitoUser(username)
		return new Promise((resolve, reject) => {
			cognitoUser.forgotPassword( {
				onSuccess: function (data) {
					resolve(data)
				},
				onFailure: function (err) {
					reject(err.message)
				}
			})
		})
	},
	/* istanbul ignore next */
	async forgotPasswordVerification(username, code, newPassword) {
		try {
			const cognitoUser = this.setupCognitoUser(username);
			await cognitoUser.confirmPassword(code, newPassword);
			return Promise.resolve(true);
		} catch (e) {
			return Promise.reject(e);
		}
	},

	/* istanbul ignore next */
	async updatePassword(cognitoUserState, newPassword, oldPassword) {
		try {
			const result = await this.authenticate(cognitoUserState.username, oldPassword).then(result => {
				result.cognitoUser.changePassword(oldPassword, newPassword, function(err) {
					if (err) throw err;
				})
			});
			return Promise.resolve(result);
		} catch (e) {
			return Promise.reject(e);
		}
	},

	/* istanbul ignore next */
	register(username, password, email) {
		let attributeList = []

		let dataEmail = {
			Name: 'email',
			Value: email
		};

		let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
			dataEmail
		);

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

	/* istanbul ignore next */
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
	/* istanbul ignore next */
	setupCognitoUser(username) {
		return new AmazonCognitoIdentity.CognitoUser({
			Username: username,
			Pool: userPool
		})
	}
}
