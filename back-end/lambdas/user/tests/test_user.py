import unittest
import index


class UserTest(unittest.TestCase):

    def test_empty_event(self):
        event = {
            "resource": ""
        }
        context = { }
        response = index.lambda_handler(event, context)
        print(response)
        self.assertIsNotNone(response)
