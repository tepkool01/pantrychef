###
# This is a TRIGGER, not an API Gateway compatible lambda; used for when a person confirms their email
###
import os
from database import DB

db = DB(database_name=os.environ['DB_Name'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)

    # This is the event that happens/triggers after they confirm their email address
    if event['triggerSource'] == 'PostConfirmation_ConfirmSignUp':
        try:
            print("Entering try")
            # Doing a replace for testing, but could be an INSERT
            response = db.execute(
                sql="INSERT INTO `User` (IsValidated, Username, CognitoID) VALUES(:validated, :username, :sub)",
                parameters=[
                    {'name': 'username', 'value': {'stringValue': event['userName']}},
                    {'name': 'sub', 'value': {'stringValue': event['request']['userAttributes']['sub']}},
                    {'name': 'validated', 'value': {'booleanValue': True}}
                ]
            )
            return event

        except Exception as e:
            print("Failed confirmation")
            print("ERROR!!! Could not add user!", str(e))
            return event
    elif event['triggerSource'] == 'PostConfirmation_ConfirmForgotPassword':
        print("Forgot password")
        return event
    else:
        print("No bueno")
        return event


