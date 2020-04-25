import unittest
import index
import boto3
import json


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

    def test_pantry_profile_get(self):
        print("Test - test_incorrect_pantry_profile_method")
        event = {
            "resource": "/pantry/{profileId}",
            "httpMethod": "GET",
            "pathParameters": {
                "profileId": "29"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = json.loads(response["body"])
        self.assertEqual(SUCCESS_PAYLOAD, response)


SUCCESS_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': [
        {"id": 105, "ingredient_name": "pancake syrup"},
        {"id": 106, "ingredient_name": "flour"},
        {"id": 131, "ingredient_name": "water"}
    ]
}