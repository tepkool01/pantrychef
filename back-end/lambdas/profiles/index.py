import json
from database import get_secret, do_stuff

def lambda_handler(event, context):

    print(event)
    #print(context)
    print("Hello World 5")

    print(get_secret())

    print(do_stuff())
    # Retrieve database content
    result = [{"name": "Test Profile 1"}, {"name": "Test Profile 2"}]

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(result)
    }
