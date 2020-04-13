import json
import os
from database import DB
from identity import Identity
from user import User

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])
headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
}


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
            'headers': headers,
            'body': json.dumps(result)
        }

    if event['resource'] == '/pantry/{profileId}':
        profile_id = int(event['pathParameters']['profileId'])
        user_id = int(u.get_id())
        if event['httpMethod'] == 'GET':
            try:
                if check_user_profile(profile_id, user_id):
                    pantry_item_list = db.execute(
                        sql="SELECT IL.ID as ItemID, IngredientName FROM `IngredientListItem` IL INNER JOIN `Ingredient` I ON I.ID = IL.IngredientID WHERE UserProfile=:ProfileID",
                        parameters=[{'name': 'ProfileID', 'value': {'longValue': profile_id}}]
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
                    'headers': headers,
                    'body': str(e)
                }
        else:
            return NOT_IMPLEMENTED_PAYLOAD

    elif event['resource'] == '/pantry/{profileId}/ingredients/{ingredientId}':
        profile_id = int(event['pathParameters']['profileId'])
        ingredient_id = int(event['pathParameters']['ingredientId'])
        user_id = int(u.get_id())

        if event['httpMethod'] == 'PUT':
            try:
                if check_user_profile(profile_id, user_id):
                    db.execute(
                        sql="INSERT IGNORE INTO `IngredientListItem` SET UserProfile=:ProfileID, IngredientID=:IngID",
                        parameters=[
                            {'name': 'ProfileID', 'value': {'longValue': profile_id}},
                            {'name': 'IngID', 'value': {'longValue': ingredient_id}}
                        ]
                    )
            except Exception as e:
                print("Exception:" + str(e))
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': str(e)
                }

        elif event['httpMethod'] == 'DELETE':
            try:
                if check_user_profile(profile_id, user_id):
                    db.execute(
                        sql="DELETE FROM `IngredientListItem` WHERE UserProfile=:ProfileID AND ID=:IngID",
                        parameters=[
                            {'name': 'ProfileID', 'value': {'longValue': profile_id}},
                            {'name': 'IngID', 'value': {'longValue': ingredient_id}}
                        ]
                    )
            except Exception as e:
                print("Exception:" + str(e))
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': str(e)
                }
        else:
            return NOT_IMPLEMENTED_PAYLOAD
    else:
        return NOT_IMPLEMENTED_PAYLOAD

    return {
        'statusCode': status_code,
        'headers': headers,
        'body': json.dumps(result)
    }


def check_user_profile(profileid, userid):
    is_profile_for_user = db.execute(
        sql="SELECT * FROM `UserProfile` WHERE UserID=:userId AND ID=:profileId",
        parameters=[
            {'name': 'userId', 'value': {'longValue': userid}},
            {'name': 'profileId', 'value': {'longValue': profileid}}
        ]
    )
    print(is_profile_for_user)
    return True


NOT_IMPLEMENTED_PAYLOAD = {
    'statusCode': 501,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': 'Not Implemented Exception: Please specify a resource and HTTP Method'
}

