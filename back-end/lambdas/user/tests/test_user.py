import unittest
import index
from tests.testdata import SUCCESS_PAYLOAD, NOT_IMPLEMENTED_PAYLOAD


class UserTest(unittest.TestCase):

    def test_empty_event(self):
        print("Test - test_empty_event")
        event = {
            'version': '1',
            'region': 'us-east-1',
            'userPoolId': 'us-east-1_FfJ4ffeia',
            'userName': 'TestUsername',
            'callerContext': {
                'awsSdkVersion': 'aws-sdk-unknown-unknown',
                'clientId': '2lk7bjr0akm1ncuo8i8piqv33g'
            },
            'triggerSource': '',
            'request': {
                'userAttributes': {
                    'sub': '5eae1c1c-70a3-44b9-a563-ec2e1377b432',
                    'cognito:user_status': 'CONFIRMED',
                    'email_verified': 'true',
                    'cognito:email_alias': 'nmf76@psu.edu',
                    'email': 'nmf76@psu.edu'
                }
            },
            'response': {}
        }
        context = {}
        response = index.lambda_handler(event, context)
        response['body'] = ''
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_new_user_event(self):
        event = {
            'version': '1',
            'region': 'us-east-1',
            'userPoolId': 'us-east-1_FfJ4ffeia',
            'userName': 'TestUsername',
            'callerContext': {
                'awsSdkVersion': 'aws-sdk-unknown-unknown',
                'clientId': '2lk7bjr0akm1ncuo8i8piqv33g'
            },
            'triggerSource': 'PostConfirmation_ConfirmSignUp',
            'request': {
                'userAttributes': {
                    'sub': '5eae1c1c-70a3-44b9-a563-ec2e1377b432',
                    'cognito:user_status': 'CONFIRMED',
                    'email_verified': 'true',
                    'cognito:email_alias': 'nmf76@psu.edu',
                    'email': 'nmf76@psu.edu'
                }
            },
            'response': {}
        }
        context = {}
        response = index.lambda_handler(event, context)
        print(response)
        self.assertEqual(response)
