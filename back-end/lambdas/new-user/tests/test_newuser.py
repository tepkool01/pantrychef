import unittest
import index
import os
from database import DB
from index import SUCCESS_PAYLOAD, NOT_IMPLEMENTED_PAYLOAD, EXCEPTION_PAYLOAD


class NewUserTest(unittest.TestCase):

    def test_empty_event(self):
        print("Test - test_empty_event")
        event = BASIC_EVENT
        event['triggerSource'] = ''
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_new_user_event(self):
        db = DB(database_name=os.environ['DB_Name'], cluster_arn=os.environ['RDS_ARN'],
                secret_arn=os.environ['Secrets_ARN'])
        db.execute(sql="REPLACE INTO `User` SET Username=:username, CognitoID=:sub, IsValidated=:validated",
            parameters=[
                    {
                        'name': 'username',
                        'value': {
                            'stringValue': 'TestLambdaNewUser'
                        }
                    },
                    {
                        'name': 'sub',
                        'value': {
                            'stringValue': 'b8ee9eeb-f02e-46c4-bc44-2a0e493ecd15'
                        }
                    },
                    {
                        'name': 'validated',
                        'value': {
                            'booleanValue': False
                        }
                    }
                ])
        print("Test - test_new_user_event")
        event = BASIC_EVENT
        event['triggerSource'] = 'PostConfirmation_ConfirmSignUp'
        context = {}
        response = index.lambda_handler(event, context)
        response['body'] = ''
        print(response)
        db = DB(database_name=os.environ['DB_Name'], cluster_arn=os.environ['RDS_ARN'],
                secret_arn=os.environ['Secrets_ARN'])
        db.execute(sql="DELETE FROM `User` WHERE Username=:username AND CognitoID=:sub",
            parameters=[
                {
                    'name': 'username',
                    'value': {
                        'stringValue': 'TestLambdaNewUser'
                    }
                },
                {
                    'name': 'sub',
                    'value': {
                        'stringValue': 'b8ee9eeb-f02e-46c4-bc44-2a0e493ecd15'
                    }
                }
            ]
        )
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_nonexistent_user_event(self):
        print("Test - test_nonexistent_user_event")
        event = BASIC_EVENT
        event['triggerSource'] = 'PostConfirmation_ConfirmSignUp'
        event['userName'] = 'NonexistentUser'
        event['sub'] = 'c4819a9c-19ed-4feb-9613-d711ffa1c847'
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(SUCCESS_PAYLOAD, response)


BASIC_EVENT = {
    'userName': 'TestLambdaNewUser',
    'triggerSource': 'PostConfirmation_ConfirmSignUp',
    'request': {
        'userAttributes': {
            'sub': 'b8ee9eeb-f02e-46c4-bc44-2a0e493ecd15',
        }
    }
}
