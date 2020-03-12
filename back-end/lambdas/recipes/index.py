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

    if event['resource'] == '/recipes':
        if event['httpMethod'] == 'GET':

            raw_result = db.execute(
                sql="select * FROM `Recipe`",
                parameters=[]
            )

            result = []
            for record in raw_result['records']:
                result.append({
                    'id': record[0]['longValue'],
                    'recipe_name': record[1]['stringValue'],
                    'cook_time': record[2]['longValue'],
                    'diet_type': record[3]['stringValue'],
                })
    elif event['resource'] == '/recipes/{recipeId}':
        print("Entered specific profile route")
        print("recipe ID:", event['pathParameters']['recipeId'])
        result = db.execute(
            sql="select * FROM `Recipe` WHERE ID=:id",
            parameters=[
                {
                    'name': 'id',
                    'value': {
                        'longValue': int(event['pathParameters']['recipeId'])
                    }
                }
            ]
        )

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }