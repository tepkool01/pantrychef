import json
import os
from database import DB
from identity import Identity
from user import User

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_Name'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])
headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
}

def lambda_handler(event, context):
    print(event)
    result = {}

    ident = Identity(event)
    claim = ident.get_claim()
    if 'sub' in claim:
        u = User(db, claim['sub'])
        u.retrieve_info()
    else:
        print("User token is expired, corrupted, we should exit/aka return out of the lambda early")
        return {
            'statusCode': 403,
            'headers': headers,
            'body': json.dumps(result)
        }

    if event['resource'] == '/recipes':
        # Todo: Retrieve from query params
        limit = 25
        offset = 0
        if event['httpMethod'] == 'GET':

            active_profile = db.execute(
                sql="SELECT ID FROM `UserProfile` WHERE UserID=:userId AND IsActive=1 LIMIT 1",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )
            pantry_item_list = db.execute(
                sql="SELECT IngredientID FROM `IngredientListItem` WHERE UserProfile=:ProfileID",
                parameters=[{'name': 'ProfileID', 'value': {'longValue': int(active_profile['records'][0][0]['longValue'])}}]
            )

            # Ranking logic
            if len(pantry_item_list['records']) > 0:
                # Grab user's ingredients they have in their pantry, and place them into a MySQL readable format
                ingredient_ids = []
                for ingredient_id in pantry_item_list['records']:
                    ingredient_ids.append(ingredient_id[0]['longValue'])
                my_ingredient_ids = ','.join(map(str, ingredient_ids))
                print(my_ingredient_ids)

                recipes = db.execute(
                    sql="SELECT RecipeID, RecipeName, CookTime, DietType, IngredientCount, count(*) as grp_count, round((count(*) / IngredientCount), 2) as pct_match, ImgURL \
                        FROM `RecipeListItem` ri \
                        LEFT JOIN Recipe r \
                        ON r.ID=ri.RecipeID \
                        WHERE ri.IngredientID IN (" + my_ingredient_ids + ") \
                        GROUP BY ri.RecipeID \
                        ORDER BY pct_match DESC LIMIT :offset, :limit",
                    parameters=[
                        {'name': 'limit', 'value': {'longValue': int(limit)}},
                        {'name': 'offset', 'value': {'longValue': int(offset)}},
                    ]

                )

                result = []
                for record in recipes['records']:
                    result.append({
                        'id': record[0]['longValue'],
                        'recipe_name': record[1]['stringValue'],
                        'cook_time': record[2]['longValue'],
                        'diet_type': record[3]['stringValue'],
                        'ingredient_count': record[4]['longValue'],
                        'ingredients_in_pantry': record[5]['longValue'],
                        'match_percent': record[6]['stringValue'],
                        'img_url': record[7]['stringValue']
                    })

                # Parse records into python object
                print("I have stuff in my pantry!")
            else:
                # They have no items in their pantry, show them everything
                recipe = db.execute(
                    sql="SELECT * FROM Recipe LIMIT :offset, :limit",
                    parameters=[
                        {'name': 'limit', 'value': {'longValue': int(limit)}},
                        {'name': 'offset', 'value': {'longValue': int(offset)}},
                    ]
                )
                result = []
                for record in recipe['records']:
                    result.append({
                        'id': record[0]['longValue'],
                        'recipe_name': record[1]['stringValue'],
                        'cook_time': record[2]['longValue'],
                        'diet_type': record[3]['stringValue'],
                        'ingredient_count': record[4]['longValue'],
                        'ingredients_in_pantry': 0,
                        'match_percent': 0,
                        'img_url': record[5]['stringValue']
                    })
    elif event['resource'] == '/recipes/{recipeId}':
        # Placeholder for all the information needed for a recipe page
        result = {
            "img": "",
            "ingredients": [],
            "directions": [],
        }

        # Grab ingredients first, and then parse them into readable format for the front end
        ingredients = db.execute(
            sql="SELECT IngredientID, IngredientName, IngredientType FROM `RecipeListItem` r JOIN `Ingredient` i ON i.ID=r.IngredientID WHERE r.RecipeID=:id",
            parameters=[{'name': 'id', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
        )
        for ingredient in ingredients['records']:
            result['ingredients'].append({
                'id': ingredient[0]['longValue'],
                'name': ingredient[1]['stringValue'],
                'type': ingredient[2]['stringValue']
            })
    elif event['resource'] == '/recipes/{recipeId}/ingredients':
        # Placeholder for all the information needed for a recipe page
        result = []
        ingredients = db.execute(
            sql="SELECT IngredientName FROM Recipe r LEFT JOIN RecipeListItem ri ON ri.RecipeID=r.ID JOIN Ingredient i ON i.ID=ri.IngredientID WHERE r.ID=id",
            parameters=[{'name': 'id', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
        )
        for ingredient in ingredients['records']:
            result.append(ingredient[0]['stringValue'])

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result)
    }