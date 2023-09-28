from flask import Flask, request, abort, jsonify
from init_db import create_table
from db_requests import get_one_secret_by_hash, add_new_secret

app = Flask(__name__)

@app.route("/ping")
def check_if_works():
    return jsonify({"message": "Server is running successfully"}), 200


@app.route("/secret/<hash>", methods=["GET"])
def get_secret_by_hash(hash: str):
    result = get_one_secret_by_hash(hash)
    if result is None:
        abort(404, "This secret doesn't exist!")
    return result


@app.route("/secret", methods=["POST"])
def add_new_secret_to_database():
    json_request = request.get_json()
    result = add_new_secret(json_request)
    if isinstance(result, str) and result.startswith("An unexpected error occured"):
        abort(400, "Secret not created")
    return result


create_table()
app.run(
    host="localhost",
    port=3000,
    debug=True,
)
