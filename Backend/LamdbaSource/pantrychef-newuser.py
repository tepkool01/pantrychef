import json
import boto3

client = boto3.client("rds-data")


def lambda_handler(event, context):
    response = newuser(event["request"]["userAttributes"])
    return response;


def newuser(user):
    user = {
        "email": user["email"],
        # "username" : user["username"],
        # "token" : user["token"],
        "verified": user["email_verified"]
    }

    # response = client.begin_transaction(
    #    database='pantrychef',
    #    resourceArn='arn:aws:rds:us-east-1:878527066650:cluster:pantrychef',
    #    schema='',
    #    secretArn='arn:aws:secretsmanager:us-east-1:878527066650:secret:pantryChefSercet-ByzZj6'
    # )

    response = client.execute_statement(
        secretArn='arn:aws:secretsmanager:us-east-1:878527066650:secret:NFPantrySecret2-RuTD3a',
        database='',
        resourceArn='arn:aws:rds:us-east-1:878527066650:cluster:pantrychef',
        sql='select * from information_schema.tables'
    )

    # response = client.commit_transaction(
    #    database='pantrychef',
    #    resourceArn='arn:aws:rds:us-east-1:878527066650:cluster:pantrychef',
    #    schema='',
    #    secretArn='arn:aws:secretsmanager:us-east-1:878527066650:secret:pantryChefSercet-ByzZj6'
    # )

    return response
