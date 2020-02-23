import json
import os
from database import DB
from identity import Identity

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)

    # Safe defaults for return values
    result = {}
    status_code = 200  # todo: make 201

    # Incoming payload from user
    payload = json.loads(event['body'])
    print(payload)

    ###
    # Grab data about person invoking the request
    ###
    ident = Identity(event)
    claim = ident.get_claim()
    if 'sub' in claim:
        print("User is actively logged in, their user ID (cognitoId) is:", claim['sub'])
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
            result = db.execute(
                sql="select * FROM `UserProfile` up JOIN `User` u on u.ID=up.UserId WHERE u.CognitoID=:cognitoId",
                parameters=[
                    {
                        'name': 'cognitoId',
                        'value': {
                            'stringValue': claim['sub']
                        }
                    }
                ]
            )
            # todo: parse info
        elif event['httpMethod'] == 'POST':
            # Create a profile
            print("Create a profile")
            transaction_id = db.begin_transaction()
            try:
                list1 = db.execute(
                    sql="INSERT INTO `IngredientList` (ListType) VALUES(:stuff)",
                    parameters=[{'name': 'stuff', 'value': {'stringValue': 'WhatGoesHere'}}],
                    transaction_id=transaction_id
                )
                print(list1)
                list2 = db.execute(
                    sql="INSERT INTO `IngredientList` (ListType) VALUES(:stuff)",
                    parameters=[{'name': 'stuff', 'value': {'stringValue': 'WhatGoesHere'}}],
                    transaction_id=transaction_id
                )
                print(list2)
                profile = db.execute(
                    sql="INSERT INTO `UserProfile` (UserID, DietType, PantryList, ShoppingList) VALUES(:userId, :dietType, :pantryList, :shoppingList)",
                    parameters=[
                        {'name': 'userId', 'value': {'longValue': int()}},
                        {'name': 'dietType', 'value': {'longValue': int(1)}},
                        {'name': 'pantryList', 'value': {'longValue': int(1)}},
                        {'name': 'shoppingList', 'value': {'longValue': int(2)}},
                    ],
                    transaction_id=transaction_id
                )
                print(profile)
                db.commit_transaction(transaction_id)
                result = profile
            except Exception as e:
                db.rollback_transaction(transaction_id)
                status_code = 500
                result = {'errorMessage': 'Could not save the profile.'}
                print(str(e))

    elif event['resource'] == '/profiles/{profileId}':
        result = {}
        print("Entered specific profile route")
        print("profile ID:", event['pathParameters']['profileId'])

    return {
        'statusCode': status_code,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }