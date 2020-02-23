class User:
    def __init__(self, db, cognito_id):
        self.cognito_id = cognito_id
        self.db = db
        self.user_data = None

    def retrieve_info(self):
        self.user_data = self.db.execute(
            sql="SELECT * FROM `User` WHERE CognitoID=:cognitoId",
            parameters=[{'name': 'cognitoId', 'value': {'stringValue': str(self.cognito_id)}}]
        )

    def get_id(self):
        return self.user_data['ID'] if self.user_data is not None else ''

    def get_username(self):
        return self.user_data['Username'] if self.user_data is not None else ''
