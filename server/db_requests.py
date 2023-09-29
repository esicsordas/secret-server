import uuid
from model import Secret
from datetime import datetime
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
        data_to_insert = {
              "hash":uuid.uuid4().hex[:16],
              "created_at":datetime.now(),
              **secret_data
        }
        
        add_secret_query = """
        INSERT INTO secrets (hash, secret_text, created_at, expires_at, remaining_views)
        VALUES (%(hash)s, %(secret_text)s, %(created_at)s, %(expires_at)s, %(remaining_views)s);
        """
        cursor.execute(add_secret_query,data_to_insert)

        secret = Secret(**data_to_insert).to_dict()

        return secret

