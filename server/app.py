from flask import Flask, request, jsonify
from init_db import create_table
from db_requests import get_one_secret_by_hash, add_new_secret, delete_secret
from logic import (
    is_out_of_views,
    is_expired,
    update_views,
    validate_input_keys,
    validate_input_data,
)
from exception import SecretServiceError

app = Flask(__name__)


@app.route("/ping")
def check_if_works():
    return jsonify({"message": "Server is running successfully"}), 200


@app.route("/v1/secret/<hash>", methods=["GET"])
def get_secret_by_hash(hash: str):
    result = get_one_secret_by_hash(hash)
    if result is None:
        raise SecretServiceError("Secret not found", status_code=404)
    is_remaining_views_zero = is_out_of_views(result)
    is_secret_expired = is_expired(result)
    if is_remaining_views_zero or is_secret_expired:
        delete_secret(result.hash)
        raise SecretServiceError("Secret not available anymore", status_code=404)
    update_views(result)
    return result.to_dict()


@app.route("/v1/secret", methods=["POST"])
def add_new_secret_to_database():
    json_request = request.get_json()
    validate_input_keys(json_request)
    validate_input_data(json_request)
    result = add_new_secret(json_request)
    return result.to_dict()


@app.errorhandler(SecretServiceError)
def handle_error(error: SecretServiceError):
    response = jsonify({"An error occured: ": error.message})
    response.status_code = error.status_code
    return response


create_table()
app.run(
    host="localhost",
    port=3000,
    debug=True,
)
