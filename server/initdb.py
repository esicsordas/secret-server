import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

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

    query = """
    CREATE TABLE IF NOT EXISTS secrets (
        id SERIAL PRIMARY KEY,
        hash VARCHAR(16),
        secret_text VARCHAR(255),
        created_at TIMESTAMP,
        expires_at TIMESTAMP,
        remaining_views INT
    );"""

    cursor.execute(query)
    connection.commit()

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()
