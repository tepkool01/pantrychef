import json
import os
from database import DB
from identity import Identity

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)
    print(context)
    result = {}

    # Grab data about person invoking the request
    ident = Identity(event)
    print(ident)
    if 'sub' in ident:
        print("User is actively logged in, their user ID (cognitoId) is:", ident['sub'])
    else:
        # todo
        print("User token is expired, corrupted, we should exit/aka return out of the lambda early")

    if event['resource'] == '/profiles':
        if event['httpMethod'] == 'GET':
            # Retrieve all profiles
            result = db.execute(
                sql="select * FROM `UserProfile` up JOIN `User` u on u.ID=up.UserId WHERE u.CognitoID=:cognitoId",
                parameters=[
                    {
                        'name': 'cognitoId',
                        'value': {
                            'stringValue': ''
                        }
                    }
                ]
            )
            # todo: parse info
        elif event['httpMethod'] == 'POST':
            result = {}
            # Create a profile
            print("Create a profile")

    elif event['resource'] == '/profiles/{profileId}':
        result = {}
        print("Entered specific profile route")
        print("profile ID:", event['pathParameters']['profileId'])

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }