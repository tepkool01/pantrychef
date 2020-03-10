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
                sql="select * FROM `UserProfile` WHERE UserID=:userId",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )

            # Parsing info, because this database outputs crazy ass shit
            result = []
            for record in raw_result['records']:
                result.append({
                    'id': record[0]['longValue'],
                    'profile_name': record[5]['stringValue']
                })

        elif event['httpMethod'] == 'POST':
            # Create a profile
            print("Create a profile")

            # First, grab the payload the user sent, and parse it
            payload = json.loads(event['body'])

            transaction_id = db.begin_transaction()
            try:
                list1 = db.execute(
                    sql="INSERT INTO `IngredientList` (ListType) VALUES(:stuff)",
                    parameters=[{'name': 'stuff', 'value': {'stringValue': 'WhatGoesHere'}}],
                    transaction_id=transaction_id
                )
                list2 = db.execute(
                    sql="INSERT INTO `IngredientList` (ListType) VALUES(:stuff)",
                    parameters=[{'name': 'stuff', 'value': {'stringValue': 'WhatGoesHere'}}],
                    transaction_id=transaction_id
                )
                profile = db.execute(
                    sql="INSERT INTO `UserProfile` (ProfileName, OrganizationName, UserID, DietType, PantryList, ShoppingList) VALUES(:profileName, :organizationName, :userId, :dietType, :pantryList, :shoppingList)",
                    parameters=[
                        {'name': 'profileName', 'value': {'stringValue': str(payload['name'])}},
                        {'name': 'organizationName', 'value': {'stringValue': str(payload['organization'])}},
                        {'name': 'userId', 'value': {'longValue': int(u.get_id())}},
                        {'name': 'dietType', 'value': {'longValue': int(1)}},  # Random number for now
                        {'name': 'pantryList', 'value': {'longValue': int(list1['generatedFields'][0]['longValue'])}},
                        {'name': 'shoppingList', 'value': {'longValue': int(list2['generatedFields'][0]['longValue'])}}
                    ],
                    transaction_id=transaction_id
                )
                print(profile)
                db.commit_transaction(transaction_id)

                # Parse results for VueJS
                result = {
                    'id': profile['generatedFields'][0]['longValue'],
                    'profile_name': str(payload['name']),
                    'organization_name': str(payload['organizationName'])
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
            active_profile = db.execute(
                sql="select top 1 * FROM `UserProfile` WHERE UserID=:userId",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )

            pantry_list = db.execute(
                sql="select * FROM `IngredientList` WHERE ListId=:listId",
                parameters=[{'name': 'listId', 'value': {'longValue': int(active_profile.PantryList)}}]
            )

            pantry_item_list = db.execute(
                sql="select * FROM `IngredientListItem` WHERE ListId=:listId",
                parameters=[{'name': 'listId', 'value': {'longValue': int(active_profile.PantryList)}}]
            )

            result = []
            for record in pantry_item_list['records']:
                result.append({
                    'ID': record[0]['longValue'],
                    'ListID': record[1]['longValue'],
                    'IngredientID': record[0]['longValue'],
                    'Amount': record[1]['longValue'],
                    'UnitType': record[0]['longValue'],
                    'ExpirationDate': record[1]['dateTimeValue'],
                })

    elif event['resource'] == '/shoppingList':
        if event['httpMethod'] == 'GET':
            ## Get user information, and the pantryListID
            active_profile = db.execute(
                sql="select top 1 * FROM `UserProfile` WHERE UserID=:userId",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )

            pantry_list = db.execute(
                sql="select * FROM `IngredientList` WHERE ListId=:listId",
                parameters=[{'name': 'listId', 'value': {'longValue': int(active_profile.ShoppingList)}}]
            )

            shopping_item_list = db.execute(
                sql="select * FROM `IngredientListItem` WHERE ListId=:listId",
                parameters=[{'name': 'listId', 'value': {'longValue': int(active_profile.PantryList)}}]
            )

            result = []
            for record in pantry_item_list['records']:
                result.append({
                    'ID': record[0]['longValue'],
                    'ListID': record[1]['longValue'],
                    'IngredientID': record[0]['longValue'],
                    'Amount': record[1]['longValue'],
                    'UnitType': record[0]['longValue'],
                    'ExpirationDate': record[1]['dateTimeValue'],
                })

        elif event['httpMethod'] == 'POST':
            print('Updating the ')

    return {
        'statusCode': status_code,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }
