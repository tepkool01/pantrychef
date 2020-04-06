import unittest
import index


class PantryTest(unittest.TestCase):

    def test_empty_event(self):
        event = { }
        context = { }
        response = index.lambda_handler(event, context)
        print(response)
        self.assertIsNotNone(response)
