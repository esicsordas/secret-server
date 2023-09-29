from model import Secret
from db_requests import delete_secret, update_secret_remaining_views
from datetime import datetime


def is_out_of_views(secret:Secret) -> bool:
    current_views = secret.remaining_views
    updated_views = current_views - 1
    update_secret_remaining_views(secret.hash, updated_views)
    return updated_views == 0


def is_expired(secret:Secret) -> bool:
    return datetime.now() > secret.expires_at
        