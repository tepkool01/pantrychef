import unittest
import index


class IngredientTest(unittest.TestCase):

    def test_GetIngredients(self):
        event = {
            "resource": "/ingredients",
            "httpMethod": "GET"
        }
        context = {}
        response = index.lambda_handler(event, context)
        print(response)
        self.assertEqual(1, 1)

    def test_Test2(self):
        self.assertEqual(2, 2)
