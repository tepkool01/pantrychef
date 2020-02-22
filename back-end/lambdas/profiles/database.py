import boto3
import base64
from botocore.exceptions import ClientError


# Todo: make this a class
def do_stuff():
    client = boto3.client('rds-data')
    response = client.execute_statement(
        database="pantryDB",
        resourceArn="arn:aws:rds:us-east-1:878527066650:cluster:pantrychef",
        secretArn="arn:aws:secretsmanager:us-east-1:878527066650:secret:pantrychefdb-OKx5ZI",
        sql="SELECT * FROM `Ingredient`"
    )
    print("Come response")
    print(response)


# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds-data.html

def get_secret():
    secret_name = "pantrychefdb"
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            raise e
    else:
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            secret = base64.b64decode(get_secret_value_response['SecretBinary'])
    return secret


