import json
def lambda_handler(event, context):

  print("Hello world2")
  print("Howdy")

  return {
      'statusCode': 200,
      'body': json.dumps('Cool')
  }
