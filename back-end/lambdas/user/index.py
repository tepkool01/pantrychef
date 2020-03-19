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
    result = {}
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

    if event['resource'] == '/user':
        user_id = int(u.get_id())
        if event['httpMethod'] == 'GET':
            try:
                raw_user_info = db.execute(
                    sql="SELECT u.Username, m.ID, m.Name FROM `User` u JOIN `MealPreferenceType` m ON m.ID=u.MealPreferenceID WHERE u.ID=:UserID",
                    parameters=[{'name': 'UserID', 'value': {'longValue': user_id}}]
                )
                print(raw_user_info)

                raw_meal_preferences = db.execute(
                    sql="SELECT * FROM MealPreferenceType",
                    parameters=[]
                )

                print(raw_meal_preferences)

                available_meal_preferences = []
                for record in raw_meal_preferences['records']:
                    available_meal_preferences.append({
                        'id': record[0]['longValue'],
                        'name': record[1]['stringValue']
                    })

                result = {
                    'username': raw_user_info['records'][0][0]['stringValue'],
                    'meal_preference': {
                        'id': raw_user_info['records'][0][1]['longValue'],
                        'name': raw_user_info['records'][0][2]['stringValue']
                    },
                    'available_meal_preferences': available_meal_preferences
                }
            except Exception as e:
                print("Exception:" + str(e))
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': str(e)
                }
        elif event['httpMethod'] == 'PATCH':
            try:
                body = json.loads(event['body'])
                print(json.dumps(body))
                if 'meal_preference' in body:
                    if isinstance(body['meal_preference']['id'], int):
                        db.execute(
                            sql="UPDATE `User` SET MealPreferenceID=:mID WHERE ID=:UserID",
                            parameters=[
                                {'name': 'mID', 'value': {'longValue': body['meal_preference']['id']}},
                                {'name': 'UserID', 'value': {'longValue': user_id}}
                            ]
                        )
            except Exception as e:
                print("Exception:" + str(e))
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': str(e)
                }

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result)
    }