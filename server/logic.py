from model import Secret
from db_requests import update_secret_remaining_views
from datetime import datetime
from exception import SecretServiceError


def is_out_of_views(secret: Secret) -> bool:
    return secret.remaining_views <= 0


def is_expired(secret: Secret) -> bool:
    return datetime.now() > secret.expires_at


def update_views(secret: Secret) -> None:
    secret.remaining_views -= 1
    update_secret_remaining_views( secret.hash, secret.remaining_views)


def validate_input_keys(input: dict) -> None:
    expected_keys = {"secret_text", "expire_after", "expire_after_views"}
    input_keys = set(input.keys())

    missing_keys = expected_keys.difference(input_keys)
    if missing_keys:
        raise SecretServiceError(f"Missing input data: {missing_keys}", status_code=400)

    unexpected_keys = input_keys.difference(expected_keys)
    if unexpected_keys:
        raise SecretServiceError(
            f"Unexpected input data: {unexpected_keys}", status_code=400
        )


def validate_input_data(input: dict) -> None:
    if (
        not isinstance(input["expire_after_views"], int)
        or input["expire_after_views"] <= 0
    ):
        raise SecretServiceError(
            "Remaining views must be a positive integer", status_code=400
        )
    if not isinstance(input["expire_after"], int) or input["expire_after"] < 0:
        raise SecretServiceError(
            "Expires after must be a positive integer, or 0", status_code=400
        )
