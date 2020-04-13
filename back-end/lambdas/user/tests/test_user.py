import unittest
import index
import boto3
from index import NOT_IMPLEMENTED_PAYLOAD


class UserTest(unittest.TestCase):
    token = ''

    def setUp(self):
        client = boto3.client('cognito-idp')

        resp = client.initiate_auth(
            ClientId='2lk7bjr0akm1ncuo8i8piqv33g',
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                "USERNAME": 'TestUsername',
                "PASSWORD": 'TestPassword1'
            }
        )
        self.token = resp['AuthenticationResult']['AccessToken']
        return

    def test_invalid_authorization(self):
        print("Test - test_empty_event")
        event = {
            "resource": "/pantry",
            "httpMethod": "GET",
            "headers": {
                "Authorization": ''
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(COGNITO_EXCEPTION_PAYLOAD, response)

    def test_valid_authorization(self):
        print("Test - test_valid_authorization")
        event = {
            "resource": "/pantry",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)


SUCCESS_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': ''
}

COGNITO_EXCEPTION_PAYLOAD = {
    'statusCode': 403,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    "body": "{}"
}