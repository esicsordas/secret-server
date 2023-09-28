from flask import Flask, request

app = Flask(__name__)


@app.route("/secret/<hash>", methods=["GET"])
def get_secret_be_hash(hash:str):
    return f"You tried to reach the {hash} endpoint"

@app.route("/secret", methods=["POST"])
def add_new_secret():
    json_request = request.get_json()
    return f"This is your data: {json_request}"


app.run(
    host = "localhost",
    port = 3000,
    debug = True,
)