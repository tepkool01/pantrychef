###
# This is a TRIGGER, not an API Gateway compatible lambda; used for when a person confirms their email
###
import os
import json
from database import DB

db = DB(database_name=os.environ['DB_Name'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)

    # This is the event that happens/triggers after they confirm their email address
    if event['triggerSource'] == 'PostConfirmation_ConfirmSignUp':
        try:
            # Doing a replace for testing, but could be an INSERT
            response = db.execute(
                sql="UPDATE `User` Set IsValidated=:validated WHERE  Username=:username AND CognitoID=:sub",
                parameters=[
                    {'name': 'username', 'value': {'stringValue': event['userName']}},
                    {'name': 'sub', 'value': {'stringValue': event['request']['userAttributes']['sub']}},
                    {'name': 'validated', 'value': {'booleanValue': True}}
                ]
            )
            result = SUCCESS_PAYLOAD
            result['body'] = json.dumps(response)
            return result

        except Exception as e:
            # Todo: maybe retry?
            print("ERROR!!! Could not add user!", str(e))
            result = EXCEPTION_PAYLOAD
            result['body'] = json.dumps(e)
            return result
    elif event['triggerSource'] == 'PostConfirmation_ConfirmForgotPassword':
        result = SUCCESS_PAYLOAD
        result['body'] = json.dumps({})
        return result
    else:
        return NOT_IMPLEMENTED_PAYLOAD


NOT_IMPLEMENTED_PAYLOAD = {
    'statusCode': 501,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': 'Not Implemented Exception: Please specify a resource and HTTP Method'
}

EXCEPTION_PAYLOAD = {
    'statusCode': 500,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': ''
}

SUCCESS_PAYLOAD = {
    'statusCode': 200,
    'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    'body': ''
}
