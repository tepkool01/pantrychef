import json
def lambda_handler(event, context):

  print("Hello World 5")

  return {
      'statusCode': 200,
      'body': json.dumps('Cool')
  }
