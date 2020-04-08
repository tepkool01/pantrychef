import unittest
import index
from tests.testdata import SUCCESS_PAYLOAD, NOT_IMPLEMENTED_PAYLOAD

class UserTest(unittest.TestCase):


    def test_empty_event(self):
        print("Test - test_empty_event")
        event = {
            "resource": ""
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)
