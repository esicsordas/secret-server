import os
import psycopg2
from psycopg2.extras import DictCursor
import dotenv
from server.exception import SecretServiceError

dotenv.load_dotenv()


def db_connection(func):
    def wrapper(*args, **kwargs):
        db_params = {
            "host": os.getenv("DATABASE_HOST"),
            "port": os.getenv("DATABASE_PORT"),
            "database": os.getenv("DATABASE_NAME"),
            "user": os.getenv("DATABASE_USERNAME"),
            "password": os.getenv("DATABASE_PASSWORD"),
        }
        try:
            connection = None
            connection = psycopg2.connect(**db_params)
            cursor = connection.cursor(cursor_factory=DictCursor)

            result = func(cursor, *args, **kwargs)
            connection.commit()

            return result
        except psycopg2.OperationalError:
            raise SecretServiceError("Database connection failed", status_code=500)
        finally:
            if connection:
                cursor.close()
                connection.close()

    return wrapper
