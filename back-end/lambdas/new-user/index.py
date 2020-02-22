###
# This is a TRIGGER, not an API Gateway compatible lambda; used for when a person confirms their email
###
from database import DB


def lambda_handler(event, context):
    print("Event incoming")
    print(event)

    if event['triggerSource'] == 'PostConfirmation_ConfirmSignUp':
        print("Username:", event['userName'])
        print("Sub:", event['request']['userAttributes']['sub'])
        print("Email:", event['request']['userAttributes']['sub'])
        # todo: add to database

    return event

