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
            raw_result = db.execute(
                sql="select * FROM `Ingredient`",
                parameters=[]
            )

            result = []
            for record in raw_result['records']:
                result.append({
                    'id': record[0]['longValue'],
                    'ingredient_name': record[1]['stringValue'],
                    'ingredient_type': record[2]['stringValue']
                })
        else:
            return NOT_IMPLEMENTED_PAYLOAD
    elif event['resource'] == '/ingredients/{ingredientId}':
        print("ingredient ID:", event['pathParameters']['ingredientId'])
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
    else:
        return NOT_IMPLEMENTED_PAYLOAD

    return {
        'statusCode': 200,
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