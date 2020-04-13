import unittest
import index
from index import SUCCESS_PAYLOAD, NOT_IMPLEMENTED_PAYLOAD

class IngredientTest(unittest.TestCase):

    def test_get_ingredients(self):
        print("Test - test_get_ingredients")
        event = {
            "resource": "/ingredients",
            "httpMethod": "GET"
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = ''
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_get_1000_ingredients(self):
        print("Test - test_get_1000_ingredients")
        event = {
            "resource": "/ingredients",
            "httpMethod": "GET"
        }
        context = {}
        response = index.lambda_handler(event, context)
        ingredients_count = len(response["body"])
        self.assertGreater(ingredients_count, 1000,
                           "There are less than 1000 ingredients in the Database, below our standard threshold.")

    def test_post_all_ingredients(self):
        print("Test - test_post_all_ingredients")
        event = {
            "resource": "/ingredients",
            "httpMethod": "POST"
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_get_specific_ingredients(self):
        print("Test - test_get_specific_ingredients")
        event = {
            "resource": "/ingredients/{ingredientId}",
            "path": "/ingredients/1",
            "httpMethod": "GET",
            "pathParameters": {
                "ingredientId": "1"
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = ''
        self.assertEqual(SUCCESS_PAYLOAD, response)

    def test_empty_event(self):
        print("Test - test_empty_event")
        event = {
            "resource": ""
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)
