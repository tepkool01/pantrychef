import unittest
import index


class NewUserTest(unittest.TestCase):

    def test_GetIngredients(self):
        event = { }
        context = { }
        response = index.lambda_handler(event, context)
        print(response)
        self.assertIsNotNone(response)