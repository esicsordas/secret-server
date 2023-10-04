import uuid
from model import Secret
from datetime import datetime, timedelta
from db_connection import db_connection


@db_connection
def get_one_secret_by_hash(cursor, hash_value: str) -> Secret | None:
    secret_by_hash_query = """
    SELECT * 
    FROM secrets
    WHERE hash = %(hash_value)s;
    """
    cursor.execute(secret_by_hash_query, {"hash_value": hash_value})

    row = cursor.fetchone()
    return Secret(**row) if row else None


@db_connection
def add_new_secret(cursor, secret_data: dict) -> Secret:
    expiration_date = (
        datetime.now() + timedelta(minutes=secret_data["expire_after"])
        if secret_data["expire_after"] > 0
        else datetime.max
    )

    data_to_insert = {
        "hash": uuid.uuid4().hex[:16],
        "created_at": datetime.now(),
        "secret_text": secret_data["secret_text"],
        "remaining_views": secret_data["expire_after_views"],
        "expires_at": expiration_date,
    }

    add_secret_query = """
        INSERT INTO secrets (hash, secret_text, created_at, expires_at, remaining_views)
        VALUES (%(hash)s, %(secret_text)s, %(created_at)s, %(expires_at)s, %(remaining_views)s);
        """
    cursor.execute(add_secret_query, data_to_insert)

    secret = Secret(**data_to_insert)

    return secret


@db_connection
def delete_secret(cursor, hash_value: str) -> None:
    delete_secret_by_hash_query = """
        DELETE FROM secrets
        WHERE hash = %(hash_value)s;
        """
    cursor.execute(delete_secret_by_hash_query, {"hash_value": hash_value})


@db_connection
def update_secret_remaining_views(cursor, hash_value: str, updated_views: int) -> None:
    update_secret_by_hash_query = """
        UPDATE secrets
        SET remaining_views = %(updated_views)s
        WHERE hash = %(hash_value)s;
        """
    cursor.execute(
        update_secret_by_hash_query,
        {"hash_value": hash_value, "updated_views": updated_views},
    )
