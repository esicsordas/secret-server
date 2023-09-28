import os
import psycopg2
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
            cursor = connection.cursor()

            result = func(cursor, *args, **kwargs)
            connection.commit()

        except (Exception, psycopg2.Error) as error:
            print("Error while connecting to PostgreSQL", error)
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
        return result

    return wrapper
