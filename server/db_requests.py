import uuid
import psycopg2
from db_connection import db_connection


@db_connection
def get_one_secret_by_hash(cursor, hash_value: str):
    current_hash = hash_value

    secret_by_hash_query = """
    SELECT * 
    FROM secrets
    WHERE hash = %s;
    """
    cursor.execute(secret_by_hash_query, (current_hash,))

    return cursor.fetchone()


@db_connection
def add_new_secret(cursor, secret_data:dict):
    try:
        random_generated_hash = uuid.uuid4().hex[:16]
        column1 = secret_data["secret_text"]
        column2 = secret_data["created_at"]
        column3 = secret_data["expires_at"]
        column4 = secret_data["remaining_views"]

        add_secret_query = """
        INSERT INTO secrets (hash, secret_text, created_at, expires_at, remaining_views)
        VALUES (%s, %s, %s, %s, %s);
        """
        cursor.execute(add_secret_query, (random_generated_hash, column1, column2, column3, column4))

        return random_generated_hash
    except (Exception, psycopg2.Error) as error:

        return "An unexpected error occured: " + error

