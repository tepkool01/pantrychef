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

    if event['resource'] == '/pantry/{profileId}':
        if event['httpMethod'] == 'GET':
            try:
                profileid = int(event['pathParameters']['profileId'])
                userid = int(u.get_id())
                print("Getting pantryList for profile:" + profileid + "user:" + userid)

                if checkUserProfile(profileid, userid):
                    pantry_item_list = db.execute(
                        sql="SELECT IL.ID as ItemID, IngredientName FROM `IngredientListItem` IL INNER JOIN `Ingredient` I ON I.ID = IL.IngredientID WHERE UserProfile=:ProfileID",
                        parameters=[
                            {'name': 'ProfileID', 'value': {'longValue': int(event['pathParameters']['profileId'])}}]
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

        elif event['httpMethod'] == 'DELETE':
            print("Delete pantryList for profile:" + event['pathParameters']['profileId'])

            try:
                profileid = int(event['pathParameters']['profileId'])
                userid = int(u.get_id())
                print("Getting pantryList for profile:" + profileid + "user:" + userid)

                if checkUserProfile(profileid, userid):
                    db.execute(
                        sql="DELETE FROM `IngredientListItem` WHERE UserProfile=:ProfileID",
                        parameters=[
                            {'name': 'ProfileID', 'value': {'longValue': int(event['pathParameters']['profileId'])}}
                        ]
                    )

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

    return {
        'statusCode': status_code,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }


def checkUserProfile(profileid, userid):
    is_profile_for_user = db.execute(
        sql="SELECT * FROM `UserProfile` WHERE UserID=:userId AND ID=:profileId",
        parameters=[
            {'name': 'userId', 'value': {'longValue': userid}},
            {'name': 'profileId', 'value': {'longValue': profileid}}
        ]
    )
    print(is_profile_for_user)
    return True
