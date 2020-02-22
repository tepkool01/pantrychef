import json
import os
from database import DB
import cognitojwt

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)
    print(context)
    result = {}

    # Grab Bearer token, without the bearer, and it becomes a normal JWT we can decode
    id_token = event['headers']['Authorization'].replace('Bearer ', '')
    print(id_token)
    REGION = 'us-east-1'  # todo: become part of environ
    USERPOOL_ID = ' us-east-1_895IYJN1N'
    APP_CLIENT_ID = '1f4k0ktrcbthkq7foan121c9sq'

    # Sync mode
    verified_claims: dict = await cognitojwt.decode_async(
        id_token,
        REGION,
        USERPOOL_ID,
        app_client_id=APP_CLIENT_ID,  # Optional
        testmode=True  # Disable token expiration check for testing purposes
    )
    print("Claim!!!")
    print(verified_claims)

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