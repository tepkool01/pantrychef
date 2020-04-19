import unittest
import index
import boto3
import json
import database
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
            "resource": "/user",
            "httpMethod": "GET",
            "headers": {
                "Authorization": ''
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(COGNITO_EXCEPTION_PAYLOAD, response)

    def test_incorrect_user_resource(self):
        print("Test - test_incorrect_user_resource")
        event = {
            "resource": "/users",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_user_method(self):
        print("Test - test_incorrect_user_resource")
        event = {
            "resource": "/user",
            "httpMethod": "POST",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_user_get(self):
        print("Test - test_user_get")
        event = {
            "resource": "/user",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = json.loads(response["body"])
        self.assertEqual(SUCCESS_GET_PAYLOAD, response)

    def test_user_patch(self):
        print("Test - test_user_patch")
        event = {
            "resource": "/user",
            "httpMethod": "PATCH",
            "body": '{ "meal_preference": { "id": 1 }}',
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(SUCCESS_PATCH_PAYLOAD, response)


SUCCESS_GET_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    'body': {
        'username': 'TestUsername',
        'meal_preference': {
            'id': 1,
            'name': 'No Preference'
        },
        'available_meal_preferences': [
            {'id': 1, 'name': 'No Preference'},
            {'id': 2, 'name': 'Vegetarian'},
            {'id': 3, 'name': 'Vegan'},
            {'id': 4, 'name': 'Gluten Free'},
            {'id': 5, 'name': 'Dairy Free'},
            {'id': 6, 'name': 'Healthy'},
            {'id': 7, 'name': 'Sustainable'}
        ]
    }
}

SUCCESS_PATCH_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': '{}'
}

COGNITO_EXCEPTION_PAYLOAD = {
    'statusCode': 403,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    "body": "{}"
}
