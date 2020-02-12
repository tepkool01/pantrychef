import json
def lambda_handler(event, context):

  print("Hello world3")
  print("Howdy")

  return {
      'statusCode': 200,
      'body': json.dumps('Cool')
  }
