import boto3

# For more information regarding the underlying boto calls and how to expand this class, go here:
# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds-data.html
# Todo: potentially place this into a lambda layer to be shared across all lambdas

""" Utility class for accessing the Database and running executable statements """


class DB:

    """Initialize the variables that will be used in all the executable statements"""
    def __init__(self, database_name, cluster_arn, secret_arn):
        self.client = boto3.client('rds-data')
        self.database = database_name
        self.db_params = {
            'resourceArn': cluster_arn,
            'secretArn': secret_arn
        }

    """Executes a SQL Statement"""
    def execute(self, sql, parameters, transaction_id=''):
        required_params = {
            'database': self.database,
            'sql': sql,
            'parameters': parameters
        }
        if len(transaction_id) > 0:
            return self.client.execute_statement(
                **self.db_params,
                **required_params,
                **{'transactionId': transaction_id}
            )
        else:
            return self.client.execute_statement(
                **self.db_params,
                **required_params
            )

    def begin_transaction(self):
        result = self.client.begin_transaction(**self.db_params, **{'database': self.database})
        return result['transactionId']

    def commit_transaction(self, transaction_id):
        return self.client.commit_transaction(**self.db_params, **{'transactionId': transaction_id})

    def rollback_transaction(self, transaction_id):
        return self.client.commit_transaction(**self.db_params, **{'transactionId': transaction_id})

