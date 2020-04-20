import unittest
import index
import boto3
import json
from index import NOT_IMPLEMENTED_PAYLOAD


class RecipeTest(unittest.TestCase):
    token = ''

    def setUp(self):
        self.maxDiff = None
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
            "resource": "/user",
            "httpMethod": "GET",
            "headers": {
                "Authorization": ''
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(COGNITO_EXCEPTION_PAYLOAD, response)

    def test_incorrect_recipe_resource(self):
        print("Test - test_empty_event")
        event = {
            "resource": "/recipes/{recipeId}/ingredients/{ingredientId}",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_recipe_recipeid_method(self):
        print("Test - test_valid_authorization")
        event = {
            "resource": "/recipes/{recipeId}",
            "httpMethod": "PUT",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_incorrect_recipe_recipeid_ingredients_method(self):
        print("Test - test_incorrect_recipe_recipeid_ingredients_method")
        event = {
            "resource": "/recipes/{recipeId}/ingredients",
            "httpMethod": "PUT",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_recipe_recipeid_ingredients_GET(self):
        print("Test - test_recipe_recipeid_ingredients_GET")
        event = {
            "resource": "/recipes/{recipeId}/ingredients",
            "httpMethod": "GET",
            "pathParameters": {
                "recipeId": "40000"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = json.loads(response["body"])
        self.assertEqual(SUCCESS_RECIPE_INGREDIENT_PAYLOAD, response)

    def test_recipe_recipeid_GET(self):
        print("Test - test_recipe_recipeid_GET")
        event = {
            "resource": "/recipes/{recipeId}",
            "httpMethod": "GET",
            "pathParameters": {
                "recipeId": "47821"
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = json.loads(response["body"])
        response["body"]["summary"] = ''
        self.assertEqual(SUCCESS_RECIPE_RECIPEID_PAYLOAD, response)

    def test_recipe_GET_Failure(self):
        print("Test - test_recipe_GET_Failure")
        event = {
            "resource": "/recipes",
            "httpMethod": "GET",
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        response["body"] = json.loads(response["body"])
        self.assertEqual(SUCCESS_RECIPE_PAYLOAD_FAILURE, response)


    def test_incorrect_recipe_resource(self):
        print("Test - test_incorrect_recipe_resource")
        event = {
            "resource": "/recipes",
            "httpMethod": "PUT",
            "queryStringParameters": {
                'limit': '25',
                'offset': '0',
                'pantry_list': 'true',
                'search': '',
                'shopping_list': 'false',
                'ww': '0'
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertEqual(NOT_IMPLEMENTED_PAYLOAD, response)

    def test_recipe_GET_25_from_pantry(self):
        print("Test - test_recipe_GET_25_from_pantry")
        event = {
            "resource": "/recipes",
            "httpMethod": "GET",
            "queryStringParameters": {
                'limit': '25',
                'offset': '0',
                'pantry_list': 'true',
                'search': '',
                'shopping_list': 'false',
                'ww': '0'
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertGreaterEqual(len(response["body"]), 25)

    def test_recipe_GET_25_from_shoppinglist(self):
        print("Test - test_recipe_GET_25_from_shoppinglist")
        event = {
            "resource": "/recipes",
            "httpMethod": "GET",
            "queryStringParameters": {
                'limit': '25',
                'offset': '0',
                'pantry_list': 'false',
                'search': '',
                'shopping_list': 'true',
                'ww': '0'
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertGreaterEqual(len(response["body"]), 25)

    def test_recipe_GET_25_from_search(self):
        print("Test - test_recipe_GET_25_from_search")
        event = {
            "resource": "/recipes",
            "httpMethod": "GET",
            "queryStringParameters": {
                'limit': '25',
                'offset': '0',
                'pantry_list': 'true',
                'search': 'apple',
                'shopping_list': 'false',
                'ww': '0'
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertGreaterEqual(len(response["body"]), 25)

    def test_recipe_weight_watchers(self):
        print("Test - test_recipe_weight_watchers")
        event = {
            "resource": "/recipes",
            "httpMethod": "GET",
            "queryStringParameters": {
                'limit': '25',
                'offset': '0',
                'pantry_list': 'true',
                'search': '',
                'shopping_list': 'false',
                'ww': '5',
                'smallest_ww': '3'
            },
            "headers": {
                "Authorization": self.token
            }
        }
        context = {}
        response = index.lambda_handler(event, context)
        self.assertGreaterEqual(len(response["body"]), 25)

SUCCESS_RECIPE_INGREDIENT_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': [
        "butter",
        "fat-skimmed chicken broth",
        "pepper",
        "pork fat",
        "raspberry vinegar",
        "red onion",
        "salad oil",
        "salt",
        "sugar",
        "sweetened dried cranberries"
    ]
}

SUCCESS_RECIPE_RECIPEID_PAYLOAD = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': {
            'id': 47821,
            'name': 'Warm Cinnamon Apples',
            'cook_time': 20,
            'img_url': '47821-556x370.jpg',
            'servings': 6,
            'summary': '',
            'health_score': 0.0,
            'weight_watcher_points': 5,
            'vegetarian': True,
            'vegan': False,
            'gluten_free': True,
            'dairy_free': False,
            'healthy': False,
            'sustainable': False,
            'directions': [
                {'order': 1,
                 'direction': 'Toss together first 4 ingredients in a large zip-top plastic bag, tossing to coat apples.'},
                {'order': 2,
                 'direction': 'Cook apple mixture, 2 Tbsp. water, and 1 Tbsp. butter in a medium saucepan over medium heat, stirring occasionally, 8 to 10 minutes or until apples are tender.'}
            ],
            'ingredients': [
                {'id': 9003, 'amount': 2.0, 'amount_unit': 'pounds', 'name': 'apples', 'img_url': 'apple.jpg'},
                {'id': 19334, 'amount': 0.5, 'amount_unit': 'cups', 'name': 'brown sugar', 'img_url': 'light-brown-sugar.jpg'},
                {'id': 1001, 'amount': 1.0, 'amount_unit': 'Tbsp', 'name': 'butter', 'img_url': 'butter-sliced.jpg'},
                {'id': 1012010, 'amount': 1.0, 'amount_unit': 'teaspoon', 'name': 'ground cinnamon', 'img_url': 'cinnamon.jpg'},
                {'id': 2025, 'amount': 0.25, 'amount_unit': 'teaspoons', 'name': 'nutmeg', 'img_url': 'ground-nutmeg.jpg'},
                {'id': 14412, 'amount': 2.0, 'amount_unit': 'Tbsps', 'name': 'water', 'img_url': 'water.png'}
            ]
        }
    }

SUCCESS_RECIPE_PAYLOAD_FAILURE = {
    'statusCode': 500,
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    'body': {'errorMsg': 'Failed to retrieve recipes.'}
}

SUCCESS_RECIPE_PAYLOAD_FAILURE_2 = {
    'statusCode': 200,
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    'body': {'errorMsg': 'Failed to retrieve recipes.'}
}

COGNITO_EXCEPTION_PAYLOAD = {
    'statusCode': 403,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    "body": "{}"
}
