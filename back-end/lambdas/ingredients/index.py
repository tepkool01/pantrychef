import json
import os
from database import DB

# Everything outside of the handler is 'cached' on the virtual machine, connections should be here
# Initialize the DB connect
db = DB(database_name=os.environ['DB_Name'], cluster_arn=os.environ['RDS_ARN'], secret_arn=os.environ['Secrets_ARN'])


def lambda_handler(event, context):

    print(event)
    print(context)
    result = {}

    if event['resource'] == '/ingredients':
        if event['httpMethod'] == 'GET':
            # Retrieve all profiles
            result = db.execute(
                sql="select * FROM `Recipe`",
                parameters=[]
            )
    elif event['resource'] == '/ingredients/{ingredientId}':
        print("recipe ID:", event['pathParameters']['ingredientId'])
        result = db.execute(
            sql="select * FROM `Ingredient` WHERE ID=:id",
            parameters=[
                {
                    'name': 'id',
                    'value': {
                        'longValue': int(event['pathParameters']['ingredientId'])
                    }
                }
            ]
        )
        print("Entered specific profile route")

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }
