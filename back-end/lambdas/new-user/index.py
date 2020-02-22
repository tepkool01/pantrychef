###
# This is a TRIGGER, not an API Gateway compatible lambda; used for when a person confirms their email
###
import os
from database import DB

db = DB(database_name=os.environ['DB_NAME'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):
    print(event)

    # This is the event that happens/triggers after they confirm their email address
    if event['triggerSource'] == 'PostConfirmation_ConfirmSignUp':
        try:
            # Doing a replace for testing, but could be an INSERT
            db.execute(
                sql="REPLACE INTO `User` SET Username=:username, CognitoID=:sub, IsValidated=:validated",
                parameters=[
                    {
                        'name': 'username',
                        'value': {
                            'stringValue': event['userName']
                        }
                    },
                    {
                        'name': 'sub',
                        'value': {
                            'stringValue': event['request']['userAttributes']['sub']
                        }
                    },
                    {
                        'name': 'validated',
                        'value': {
                            'booleanValues': True
                        }
                    }
                ]
            )
        except Exception as e:
            # Todo: maybe retry?
            print("ERROR!!! Could not add user!", str(e))

    return event
