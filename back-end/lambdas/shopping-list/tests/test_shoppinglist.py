import unittest
import index
import boto3
from index import NOT_IMPLEMENTED_PAYLOAD


class PantryTest(unittest.TestCase):
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

    def test_incorrect_pantry_resource(self):
        print("Test - test_incorrect_pantry_resource")
        event = {
            "resource": "/shopping-lists",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    #This test could start failing if the test user deletes their profile
    def test_incorrect_pantry_profile_method(self):
        print("Test - test_incorrect_pantry_profile_method")
        event = {
            "resource": "/shopping-lists/{profileId}",
            "httpMethod": "PUT",
            "pathParameters": {
                "profileId": "29"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_pantry_profile_ingredient_method(self):
        print("Test - test_incorrect_pantry_profile_method")
        event = {
            "resource": "/shopping-lists/{profileId}/ingredients/{ingredientId}",
            "httpMethod": "GET",
            "pathParameters": {
                "profileId": "29",
                "ingredientId": "1"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_pantry_profile_get(self):
        print("Test - test_incorrect_pantry_profile_method")
        event = {
            "resource": "/shopping-lists/{profileId}",
            "httpMethod": "GET",
            "pathParameters": {
                "profileId": "29"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        body = '[{"id": 20, "ingredient_name": "heavy cream"}, {"id": 21, "ingredient_name": "eggs"}, {"id": 22, "ingredient_name": "mint"}]'
        response = index.lambda_handler(event, context)
        SUCCESS_PAYLOAD["body"] = body
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_pantry_profile_ingredient_put_delete(self):
        print("Test - test_pantry_profile_ingredient_put_delete")
        event = {
            "resource": "/shopping-lists/{profileId}/ingredients/{ingredientId}",
            "httpMethod": "PUT",
            "pathParameters": {
                "profileId": "29",
                "ingredientId": "2010"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        SUCCESS_PAYLOAD['body'] = '{}'
        response = index.lambda_handler(event, context)
        self.assertEqual(SUCCESS_PAYLOAD, response)

        # Part 2 - Delete the same event.
        event["httpMethod"] = "DELETE"
        response = index.lambda_handler(event, context)
        self.assertEqual(SUCCESS_PAYLOAD, response)

SUCCESS_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': '[]'
}

COGNITO_EXCEPTION_PAYLOAD = {
    'statusCode': 403,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    "body": "{}"
}