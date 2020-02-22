import json
import os
from database import DB
from identity import getClaim

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):

    print(event)
    print(context)
    result = {}
    print(getClaim(event, context))

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
