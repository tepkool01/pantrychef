import boto3

# For more information regarding the underlying boto calls and how to expand this class, go here:
# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rds-data.html


""" Utility class for accessing the Database and running executable statements """


class DB:

    """Initialize the variables that will be used in all the executable statements"""
    def __init__(self, database_name, cluster_arn, secret_arn):
        self.client = boto3.client('rds-data')
        self.database_name = database_name
        self.cluster_arn = cluster_arn
        self.secret_arn = secret_arn

    """Executes a SQL Statement"""
    def execute(self, sql, parameters):
        return self.client.execute_statement(
            database=self.database_name,
            resourceArn=self.cluster_arn,
            secretArn=self.secret_arn,
            sql=sql,
            parameters=parameters
        )

