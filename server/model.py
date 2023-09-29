from datetime import datetime

class Secret:
    hash:str
    secret_text:str
    created_at:datetime
    expires_at:datetime
    remaining_views:int

    def __init__(self, hash, secret_text, created_at, expires_at, remaining_views):
        self.hash = hash
        self.secret_text = secret_text
        self.created_at = created_at
        self.expires_at = expires_at
        self.remaining_views = remaining_views

    def to_dict(self) -> dict:
        secret_to_dict = {
            "hash": self.hash,
            "secret_text": self.secret_text,
            "created_at": self.created_at,
            "expires_at":self.expires_at,
            "remaining_views":self.remaining_views
        }
        return secret_to_dict
    