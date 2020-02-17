import json


def lambda_handler(event, context):

  print("Hello World 5")

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
