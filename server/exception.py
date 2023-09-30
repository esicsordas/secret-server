class SecretServiceError(Exception):
    message: str
    status_code: int

    def __init__(self, message: str, status_code: int = 400):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code
