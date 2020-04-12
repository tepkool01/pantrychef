SUCCESS_PAYLOAD = {
      'statusCode': 200,
      'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      'body': ''
  }


NOT_IMPLEMENTED_PAYLOAD = {
      'statusCode': 501,
      'headers': {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      'body': 'Not Implemented Exception: Please specify a resource and HTTP Method'
  }
