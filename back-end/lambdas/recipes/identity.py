import cognitojwt
import os
from jose import jwt

class Identity:
    def __init__(self, event):
        # Grab Bearer token, without the bearer, and it becomes a normal JWT we can decode
        self.id_token = event['headers']['Authorization'].replace('Bearer ', '')
        self.verified_claims = {}

    def get_claim(self):
        try:
            # Decode the token, and return to user
            self.verified_claims = cognitojwt.decode(
                self.id_token,
                os.environ["AWS_REGION"],
                os.environ["Cognito_Pool_ID"]
            )
            return self.verified_claims
        except Exception as e:
            try:
                # try with more basic connection
                resp = jwt.get_unverified_claims(self.id_token)
                return resp
            except Exception as e2:
                print(str(e))
                print(str(e2))
                return {}