import json
import os
from database import DB
from identity import Identity
from user import User

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)

    # Safe defaults for return values
    result = {}
    status_code = 200  # todo: make 201

    ###
    # Grab data about person invoking the request TODO: refactor this out?
    ###
    ident = Identity(event)
    claim = ident.get_claim()
    if 'sub' in claim:
        print("User is actively logged in, their user ID (cognitoId) is:", claim['sub'])
        # Retrieve User Data for USER ID
        u = User(db, claim['sub'])
        u.retrieve_info()
    else:
        print("User token is expired, corrupted, we should exit/aka return out of the lambda early")
        return {
            'statusCode': 403,
            'headers': {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'body': json.dumps(result)
        }

    ###
    # Actual Routing
    ###
    if event['resource'] == '/profiles':
        if event['httpMethod'] == 'GET':
            # Retrieve all profiles
            raw_result = db.execute(
                sql="SELECT ID, ProfileName FROM `UserProfile` WHERE UserID=:userId",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )

            # Parsing info, because this database outputs crazy ass shit
            result = []
            for record in raw_result['records']:
                result.append({
                    'id': record[0]['longValue'],
                    'profile_name': record[1]['stringValue']
                })

        elif event['httpMethod'] == 'POST':
            # Create a profile
            print("Create a profile")

            # First, grab the payload the user sent, and parse it
            payload = json.loads(event['body'])
            
            try:

                profile = db.execute(
                    sql="INSERT INTO `UserProfile` (ProfileName, UserID, DietType) VALUES(:profileName, :userId, :dietType)",
                    parameters=[
                        {'name': 'profileName', 'value': {'stringValue': str(payload['name'])}},
                        {'name': 'userId', 'value': {'longValue': int(u.get_id())}},
                        {'name': 'dietType', 'value': {'longValue': int(1)}},  # Random number for now
                    ]
                )
                print(profile)

                # Parse results for VueJS
                result = {
                    'id': profile['generatedFields'][0]['longValue'],
                    'profile_name': str(payload['name'])
                }
            except Exception as e:
                db.rollback_transaction(transaction_id)
                status_code = 500
                result = {'errorMessage': 'Could not save the profile.'}
                print(str(e))

    elif event['resource'] == '/profiles/{profileId}':
        if event['httpMethod'] == 'DELETE':
            # todo: status code 204
            print("Deleting", event['pathParameters']['profileId'])
            db.execute(
                sql="DELETE FROM UserProfile WHERE UserId=:userId AND ID=:id",
                parameters=[
                    {'name': 'userId', 'value': {'longValue': int(u.get_id())}},
                    {'name': 'id', 'value': {'longValue': int(event['pathParameters']['profileId'])}}
                ]
            )

    elif event['resource'] == '/pantry':
        if event['httpMethod'] == 'GET':
            ## Get user information, and the pantryListID
            print("Getting pantryList")

            try:
                active_profile = db.execute(
                    sql="SELECT ID FROM `UserProfile` WHERE UserID=:userId LIMIT 1",
                    parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
                )
                
                pantry_item_list = db.execute(
                    sql="SELECT IL.ID as ItemID, IngredientName FROM `IngredientListItem` IL INNER JOIN `Ingredient` I ON I.ID = IL.IngredientID WHERE UserProfile=:ProfileID",
                    parameters=[{'name': 'ProfileID', 'value': {'longValue': int(active_profile['records'][0][0]['longValue'])}}]
                )
                
                print(pantry_item_list)

                result = []
                for record in pantry_item_list['records']:
                    result.append({
                        'id': record[0]['longValue'],
                        'ingredient_name': record[1]['stringValue']
                })
            except Exception as e:
                print("Exception:" + str(e))
                return {
                    'statusCode': 500,
                    'headers': {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    'body': str(e)
                }

    elif event['resource'] == '/shoppingList':
        if event['httpMethod'] == 'GET':
            ## Get user information, and the pantryListID
            try:
                active_profile = db.execute(
                    sql="SELECT ID FROM `UserProfile` WHERE UserID=:userId LIMIT 1",
                    parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
                )

                shopping_item_list = db.execute(
                    sql="SELECT ID, IngredientID FROM `ShoppingListItem` WHERE UserProfile=:listId",
                    parameters=[{'name': 'ProflieID', 'value': {'longValue': int(active_profile.ID)}}]
                )

                result = []
                for record in pantry_item_list['records']:
                    result.append({
                        'ID': record[0]['longValue'],
                        'IngredientID': record[1]['longValue']
                })
            except Exception as e:
                print(str(e))
                return {
                    'statusCode': 500,
                    'headers': {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    'body': str(e)
                }

    return {
        'statusCode': status_code,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }
