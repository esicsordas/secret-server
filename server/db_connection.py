import os
import psycopg2
from psycopg2.extras import DictCursor
import dotenv

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
            connection = psycopg2.connect(**db_params)
            cursor = connection.cursor(cursor_factory=DictCursor)

            result = func(cursor, *args, **kwargs)
            connection.commit()
            
            return result
        except (Exception, psycopg2.Error) as error:
            print("Error while connecting to PostgreSQL", error, error.__class__)
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    return wrapper
