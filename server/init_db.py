from db_connection import db_connection


@db_connection
def create_table(cursor):
    create_table_query = """
            CREATE TABLE IF NOT EXISTS secrets (
                id SERIAL PRIMARY KEY,
                hash VARCHAR(16),
                secret_text VARCHAR(255),
                created_at TIMESTAMP,
                expires_at TIMESTAMP,
                remaining_views INT
            );"""
    cursor.execute(create_table_query)


if __name__ == "__main__":
    create_table()
