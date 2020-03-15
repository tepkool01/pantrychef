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
                sql="SELECT ID FROM `UserProfile` WHERE UserID=:userId LIMIT 1",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )
            pantry_item_list = db.execute(
                sql="SELECT IngredientID FROM `IngredientListItem` WHERE UserProfile=:ProfileID",
                parameters=[{'name': 'ProfileID', 'value': {'longValue': int(active_profile['records'][0][0]['longValue'])}}]
            )

            if len(pantry_item_list['records']) > 0:
                # Ranking logic
                ingredients = (14, 28, 50)

                # Gather all items in shopping list

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
                        'ingredient_count': record[4]['longValue']
                    })
    elif event['resource'] == '/recipes/{recipeId}':
        result = db.execute(
            sql="select * FROM `Recipe` WHERE ID=:id",
            parameters=[{'name': 'id', 'value': {'longValue': int(event['pathParameters']['recipeId'])}}]
        )

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result)
    }