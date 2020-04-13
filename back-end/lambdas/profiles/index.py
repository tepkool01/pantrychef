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
                sql="SELECT ID, ProfileName, IsActive FROM `UserProfile` WHERE UserID=:userId",
                parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
            )

            # Parsing info, because this database outputs crazy ass shit
            result = []
            for record in raw_result['records']:
                result.append({
                    'id': record[0]['longValue'],
                    'profile_name': record[1]['stringValue'],
                    'isActive': record[2]['booleanValue']
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
                status_code = 500
                result = {'errorMessage': 'Could not save the profile.'}
                print(str(e))
        else:
            return NOT_IMPLEMENTED_PAYLOAD

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
        else:
            return NOT_IMPLEMENTED_PAYLOAD

    elif event['resource'] == '/profiles/{profileId}/activate':
        if event['httpMethod'] == 'PUT':
            # Reset all to 0
            try:
                db.execute(
                    sql="UPDATE UserProfile SET IsActive=0 WHERE UserId=:userId",
                    parameters=[{'name': 'userId', 'value': {'longValue': int(u.get_id())}}]
                )
                db.execute(
                    sql="UPDATE UserProfile SET IsActive=1 WHERE UserId=:userId and ID=:id",
                    parameters=[
                        {'name': 'userId', 'value': {'longValue': int(u.get_id())}},
                        {'name': 'id', 'value': {'longValue': int(event['pathParameters']['profileId'])}}
                    ]
                )
            except Exception as e:
                print(str(e))
        else:
            return NOT_IMPLEMENTED_PAYLOAD
    else:
        return NOT_IMPLEMENTED_PAYLOAD

    return {
        'statusCode': status_code,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
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

