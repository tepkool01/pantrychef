import json
def lambda_handler(event, context):

  print("Hello world3asdfasdfasdf")
  print("Howdy")

  return {
      'statusCode': 200,
      'body': json.dumps('Cool')
  }
