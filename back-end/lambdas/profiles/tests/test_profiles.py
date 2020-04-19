import unittest
import index
import boto3
import json
from index import NOT_IMPLEMENTED_PAYLOAD


class IngredientTest(unittest.TestCase):
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

    def test_incorrect_profile_resource(self):
        print("Test - test_incorrect_profile_resource")
        event = {
            "resource": "/profile",
            "httpMethod": "PUT",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_profile_resource(self):
        print("Test - test_incorrect_profile_resource")
        event = {
            "resource": "/profile",
            "httpMethod": "PUT",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_profile_profileid_resource(self):
        print("Test - test_incorrect_profile_resource")
        event = {
            "resource": "/profiles/{profileId}",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_profile_active_resource(self):
        print("Test - test_incorrect_profile_resource")
        event = {
            "resource": "/profiles/{profileId}/activate",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_profile_get_profiles(self):
        print("Test - test_profile_get_profiles")
        event = {
            "resource": "/profiles",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = '{}'
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_profile_create_and_delete(self):
        print("Test - test_profile_create_and_delete")
        event = {
            "resource": "/profiles",
            "httpMethod": "POST",
            "headers": {
                "Authorization": self.token
            },
            "body":  '{"name":"TestLambdaAdd","ingredients":[]}'

        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = json.loads(response["body"])
        # Saving for Delete below
        profile_id = response["body"]["id"]

        # Setting to 0 so it doesnt always fault with a new identity integer
        response["body"]["id"] = 0

        CUSTOM_SUCCESS = {
            'body': {
                "id": 0,
                "profile_name": "TestLambdaAdd"
            },
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'statusCode': 200
        }
        self.assertEqual(CUSTOM_SUCCESS, response)

        event = {
            "resource": "/profiles/{profileId}",
            "httpMethod": "DELETE",
            "pathParameters": {
                "profileId": profile_id
            },
            "headers": {
                "Authorization": self.token
            }
        }
        response = index.lambda_handler(event, context)
        print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", response)
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_profile_activate(self):
        print("Test - test_profile_activate")
        event = {
            "resource": "/profiles/{profileId}/activate",
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
        self.assertEqual(SUCCESS_PAYLOAD, response)


SUCCESS_PAYLOAD = {
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