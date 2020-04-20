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


def find_ww_sum(arr, ww_sum):
    """
    This is our algorithmic component that determines the closest matching weight watcher meal prep based on
    WW points, percent match (ingredients in pantry) for a 3-course meal; we first provide it a sorted WW list
    :param arr: Array - possible matches, sorted
    :param ww_sum: Integer - requested weight watcher total daily points
    :return: Array
    """
    best_difference = float('inf')
    best_triplet = []

    for i in range(len(arr) - 2):
        j = i + 1
        k = len(arr) - 1

        while k >= j:
            triplet_sum = arr[i]['weight_watcher_points'] + arr[j]['weight_watcher_points'] + arr[k]['weight_watcher_points']

            # Exact match!
            if triplet_sum == ww_sum:
                return [arr[i], arr[j], arr[k]]

            if triplet_sum > ww_sum:
                k -= 1
            else:
                # Hold onto the best guess
                if best_difference > (ww_sum - triplet_sum):
                    best_difference = ww_sum - triplet_sum
                    best_triplet = [arr[i], arr[j], arr[k]]

                j += 1

    return best_triplet


def lambda_handler(event, context):
    print(event)
    result = {}

    try:
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
            limit = int(event['queryStringParameters']['limit'])
            offset = int(event['queryStringParameters']['offset'])
            if event['httpMethod'] == 'GET':
                # Grab active profile to retrieve shopping and pantry list
                active_profile = db.execute(
                    sql="SELECT ID FROM `UserProfile` WHERE UserID=:userId AND IsActive=1 LIMIT 1",
                    parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
                )

                # Grab all ingredient IDs they want to include in the search
                ingredient_ids = []
                if event['queryStringParameters']['pantry_list'] == 'true':
                    # include pantry list in search criteria / ranking
                    pantry_item_list = db.execute(
                        sql="SELECT IngredientID FROM `IngredientListItem` WHERE UserProfile=:ProfileID",
                        parameters=[{'name': 'ProfileID',
                                     'value': {'longValue': int(active_profile['records'][0][0]['longValue'])}}]
                    )
                    for ingredient_id in pantry_item_list['records']:
                        ingredient_ids.append(ingredient_id[0]['longValue'])

                if event['queryStringParameters']['shopping_list'] == 'true':
                    # include shopping list in search criteria
                    shopping_item_list = db.execute(
                        sql="SELECT IngredientID FROM `ShoppingListItem` WHERE UserProfile=:ProfileID",
                        parameters=[{'name': 'ProfileID',
                                     'value': {'longValue': int(active_profile['records'][0][0]['longValue'])}}]
                    )
                    for ingredient_id in shopping_item_list['records']:
                        ingredient_ids.append(ingredient_id[0]['longValue'])

                ##
                # Slightly hacky conditional statements that could be refactored DRY
                ##

                # Weight Watcher search
                if len(ingredient_ids) > 0 and int(event['queryStringParameters']['ww']) > 0 and int(event['queryStringParameters']['smallest_ww']) > 0:
                    print("ww search")
                    my_ingredient_ids = ','.join(map(str, ingredient_ids))
                    print(my_ingredient_ids)

                    recipes = db.execute(
                        sql="SELECT RecipeID, RecipeName, CookTime, Servings, IngredientCount, count(*) as grp_count, round((count(*) / IngredientCount), 2) as pct_match, ImgURL, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable \
                                FROM `RecipeListItem` ri \
                                LEFT JOIN Recipe r \
                                ON r.ID=ri.RecipeID \
                                WHERE ri.IngredientID IN (" + my_ingredient_ids + ") AND WeightWatcherPoints>=:smallest_ww \
                                GROUP BY ri.RecipeID \
                                ORDER BY WeightWatcherPoints ASC, pct_match DESC \
                                LIMIT :offset, :limit",
                        parameters=[
                            {'name': 'limit', 'value': {'longValue': int(limit)}},
                            {'name': 'offset', 'value': {'longValue': int(offset)}},
                            {'name': 'smallest_ww', 'value': {'longValue': int(event['queryStringParameters']['smallest_ww'])}},
                        ]
                    )

                    parsed_query_result = []
                    for record in recipes['records']:
                        parsed_query_result.append({
                            'id': record[0]['longValue'],
                            'recipe_name': record[1]['stringValue'],
                            'cook_time': record[2]['longValue'],
                            'servings': record[3]['longValue'],
                            'ingredient_count': record[4]['longValue'],
                            'ingredients_in_pantry': record[5]['longValue'],
                            'match_percent': record[6]['stringValue'],
                            'img_url': record[7]['stringValue'],
                            'summary': record[8]['stringValue'],
                            'health_score': record[9]['doubleValue'],
                            'weight_watcher_points': record[10]['longValue'],
                            'vegetarian': record[11]['booleanValue'],
                            'vegan': record[12]['booleanValue'],
                            'gluten_free': record[13]['booleanValue'],
                            'dairy_free': record[14]['booleanValue'],
                            'healthy': record[15]['booleanValue'],
                            'sustainable': record[16]['booleanValue'],
                        })
                    result = find_ww_sum(parsed_query_result, int(event['queryStringParameters']['ww']))

                # Search by ingredients AND search name
                elif len(ingredient_ids) > 0 and len(event['queryStringParameters']['search']) > 0:
                    print("Ingredient and search name")
                    my_ingredient_ids = ','.join(map(str, ingredient_ids))
                    print(my_ingredient_ids)
                    # TODO: Insecure

                    recipes = db.execute(
                        sql="SELECT RecipeID, RecipeName, CookTime, Servings, IngredientCount, count(*) as grp_count, round((count(*) / IngredientCount), 2) as pct_match, ImgURL, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable \
                            FROM `RecipeListItem` ri \
                            LEFT JOIN Recipe r \
                            ON r.ID=ri.RecipeID \
                            WHERE ri.IngredientID IN (" + my_ingredient_ids + ") AND RecipeName LIKE '%" + event['queryStringParameters']['search'] + "%' \
                            GROUP BY ri.RecipeID \
                            ORDER BY pct_match DESC LIMIT :offset, :limit",
                        parameters=[
                            {'name': 'limit', 'value': {'longValue': int(limit)}},
                            {'name': 'offset', 'value': {'longValue': int(offset)}},
                            {'name': 'recipe_name', 'value': {'stringValue': str(event['queryStringParameters']['search'])}},
                        ]
                    )

                    result = []
                    for record in recipes['records']:
                        result.append({
                            'id': record[0]['longValue'],
                            'recipe_name': record[1]['stringValue'],
                            'cook_time': record[2]['longValue'],
                            'servings': record[3]['longValue'],
                            'ingredient_count': record[4]['longValue'],
                            'ingredients_in_pantry': record[5]['longValue'],
                            'match_percent': record[6]['stringValue'],
                            'img_url': record[7]['stringValue'],
                            'summary': record[8]['stringValue'],
                            'health_score': record[9]['doubleValue'],
                            'weight_watcher_points': record[10]['longValue'],
                            'vegetarian': record[11]['booleanValue'],
                            'vegan': record[12]['booleanValue'],
                            'gluten_free': record[13]['booleanValue'],
                            'dairy_free': record[14]['booleanValue'],
                            'healthy': record[15]['booleanValue'],
                            'sustainable': record[16]['booleanValue'],
                        })

                # Search just by ingredients, no search name
                elif len(ingredient_ids) > 0 and len(event['queryStringParameters']['search']) == 0:
                    print("Ingredient search")
                    my_ingredient_ids = ','.join(map(str, ingredient_ids))
                    print(my_ingredient_ids)

                    recipes = db.execute(
                        sql="SELECT RecipeID, RecipeName, CookTime, Servings, IngredientCount, count(*) as grp_count, round((count(*) / IngredientCount), 2) as pct_match, ImgURL, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable \
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
                            'servings': record[3]['longValue'],
                            'ingredient_count': record[4]['longValue'],
                            'ingredients_in_pantry': record[5]['longValue'],
                            'match_percent': record[6]['stringValue'],
                            'img_url': record[7]['stringValue'],
                            'summary': record[8]['stringValue'],
                            'health_score': record[9]['doubleValue'],
                            'weight_watcher_points': record[10]['longValue'],
                            'vegetarian': record[11]['booleanValue'],
                            'vegan': record[12]['booleanValue'],
                            'gluten_free': record[13]['booleanValue'],
                            'dairy_free': record[14]['booleanValue'],
                            'healthy': record[15]['booleanValue'],
                            'sustainable': record[16]['booleanValue'],
                        })

                # Search just by search name
                elif len(ingredient_ids) == 0 and len(event['queryStringParameters']['search']) > 0:
                    print("Search by name")
                    # TODO: This is a security issue, but I can't figure out right now how to get the parameter in
                    recipes = db.execute(
                        sql="SELECT RecipeID, RecipeName, CookTime, Servings, IngredientCount, count(*) as grp_count, round((count(*) / IngredientCount), 2) as pct_match, ImgURL, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable \
                                FROM `RecipeListItem` ri \
                                LEFT JOIN Recipe r \
                                ON r.ID=ri.RecipeID \
                                WHERE r.RecipeName LIKE '%" + event['queryStringParameters']['search'] + " %' \
                                GROUP BY ri.RecipeID \
                                ORDER BY pct_match DESC LIMIT :offset, :limit",
                        parameters=[
                            {'name': 'limit', 'value': {'longValue': int(limit)}},
                            {'name': 'offset', 'value': {'longValue': int(offset)}},
                            {'name': 'recipeName', 'value': {'stringValue': str(event['queryStringParameters']['search'])}},
                        ]
                    )

                    result = []
                    for record in recipes['records']:
                        result.append({
                            'id': record[0]['longValue'],
                            'recipe_name': record[1]['stringValue'],
                            'cook_time': record[2]['longValue'],
                            'servings': record[3]['longValue'],
                            'ingredient_count': record[4]['longValue'],
                            'ingredients_in_pantry': record[5]['longValue'],
                            'match_percent': record[6]['stringValue'],
                            'img_url': record[7]['stringValue'],
                            'summary': record[8]['stringValue'],
                            'health_score': record[9]['doubleValue'],
                            'weight_watcher_points': record[10]['longValue'],
                            'vegetarian': record[11]['booleanValue'],
                            'vegan': record[12]['booleanValue'],
                            'gluten_free': record[13]['booleanValue'],
                            'dairy_free': record[14]['booleanValue'],
                            'healthy': record[15]['booleanValue'],
                            'sustainable': record[16]['booleanValue'],
                        })

                # Empty search
                else:
                    print("Empty search")
                    # They have no items in their pantry, show them everything
                    recipe = db.execute(
                        sql="SELECT ID, RecipeName, CookTime, ImgURL, Servings, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable, IngredientCount FROM Recipe LIMIT :offset, :limit",
                        parameters=[
                            {'name': 'limit', 'value': {'longValue': int(limit)}},
                            {'name': 'offset', 'value': {'longValue': int(offset)}},
                        ]
                    )
                    result = []
                    for record in recipe['records']:
                        result.append({
                            'id': record[0]['longValue'],
                            'name': record[1]['stringValue'],
                            'cook_time': record[2]['longValue'],
                            'img_url': record[3]['stringValue'],
                            'servings': record[4]['longValue'],
                            'summary': record[5]['stringValue'],
                            'health_score': record[6]['doubleValue'],
                            'weight_watcher_points': record[7]['longValue'],
                            'vegetarian': record[8]['booleanValue'],
                            'vegan': record[9]['booleanValue'],
                            'gluten_free': record[10]['booleanValue'],
                            'dairy_free': record[11]['booleanValue'],
                            'healthy': record[12]['booleanValue'],
                            'sustainable': record[13]['booleanValue'],
                            'ingredient_count': record[14]['longValue'],
                            'ingredients_in_pantry': 0,
                        })
            else:
                return NOT_IMPLEMENTED_PAYLOAD

        elif event['resource'] == '/recipes/{recipeId}':
            if event['httpMethod'] == 'GET':
                result = {
                    'directions': [],
                   'ingredients': []
                }

                # First grab high-level recipe information
                recipe_query = db.execute(
                    sql="SELECT ID, RecipeName, CookTime, ImgURL, Servings, Summary, HealthScore, WeightWatcherPoints, Vegetarian, Vegan, GlutenFree, DairyFree, Healthy, Sustainable FROM Recipe WHERE ID=:id",
                    parameters=[{'name': 'id', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
                )
                # Set recipe
                for recipe in recipe_query['records']:
                    result = {
                        'id': recipe[0]['longValue'],
                        'name': recipe[1]['stringValue'],
                        'cook_time': recipe[2]['longValue'],
                        'img_url': recipe[3]['stringValue'],
                        'servings': recipe[4]['longValue'],
                        'summary': recipe[5]['stringValue'],
                        'health_score': recipe[6]['doubleValue'],
                        'weight_watcher_points': recipe[7]['longValue'],
                        'vegetarian': recipe[8]['booleanValue'],
                        'vegan': recipe[9]['booleanValue'],
                        'gluten_free': recipe[10]['booleanValue'],
                        'dairy_free': recipe[11]['booleanValue'],
                        'healthy': recipe[12]['booleanValue'],
                        'sustainable': recipe[13]['booleanValue'],
                        'directions': [],
                        'ingredients': []
                    }

                # Grab directions
                directions_query = db.execute(
                    sql="SELECT SortOrder, Direction FROM Directions WHERE RecipeID=:id ORDER BY SortOrder ASC",
                    parameters=[{'name': 'id', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
                )

                for direction in directions_query['records']:
                    result['directions'].append({
                        'order': direction[0]['longValue'],
                        'direction': direction[1]['stringValue']
                    })

                # Grab ingredients
                ingredients_query = db.execute(
                    sql="SELECT i.ID, r.Amount, r.AmountUnitID, i.IngredientName, i.IngredientImgURL FROM RecipeListItem r LEFT JOIN Ingredient i ON r.IngredientID=i.ID WHERE RecipeID=:id",
                    parameters=[{'name': 'id', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
                )

                for ingredient in ingredients_query['records']:
                    result['ingredients'].append({
                        'id': ingredient[0]['longValue'],
                        'amount': ingredient[1]['doubleValue'],
                        'amount_unit': ingredient[2]['stringValue'],
                        'name': ingredient[3]['stringValue'],
                        'img_url': ingredient[4]['stringValue'],
                    })
            else:
                return NOT_IMPLEMENTED_PAYLOAD
        elif event['resource'] == '/recipes/{recipeId}/ingredients':
            if event['httpMethod'] == 'GET':
                # Placeholder for all the information needed for a recipe page
                result = []
                ingredients = db.execute(
                   sql="SELECT IngredientName FROM Recipe r LEFT JOIN RecipeListItem ri ON ri.RecipeID=r.ID JOIN Ingredient i ON i.ID=ri.IngredientID WHERE r.ID=:recipeId",
                   parameters=[{'name': 'recipeId', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
                )
                for ingredient in ingredients['records']:
                    result.append(ingredient[0]['stringValue'])
            else:
                return NOT_IMPLEMENTED_PAYLOAD
        else:
            return NOT_IMPLEMENTED_PAYLOAD
    except Exception as e:
        print(str(e))
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'errorMsg': 'Failed to retrieve recipes.'})
        }

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result)
    }


NOT_IMPLEMENTED_PAYLOAD = {
    'statusCode': 501,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': 'Not Implemented Exception: Please specify a resource and HTTP Method'
}

