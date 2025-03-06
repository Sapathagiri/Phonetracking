from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from src.tracker import track_phone_number

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# File to store user data
USER_DATA_FILE = "users.json"

# Ensure the user data file exists
if not os.path.exists(USER_DATA_FILE):
    with open(USER_DATA_FILE, "w") as f:
        json.dump({}, f)


def load_users():
    """Load user data from the JSON file."""
    with open(USER_DATA_FILE, "r") as f:
        return json.load(f)


def save_users(users):
    """Save user data to the JSON file."""
    with open(USER_DATA_FILE, "w") as f:
        json.dump(users, f, indent=4)


@app.route("/signup", methods=["POST"])
def signup():
    try:
        # Parse JSON data from request
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({
                "success": False,
                "error": "Username and password are required."
            }), 400

        # Load existing users
        users = load_users()

        if username in users:
            return jsonify({
                "success": False,
                "error": "Username already exists."
            }), 400

        # Add new user
        users[username] = {"password": password}
        save_users(users)

        return jsonify({
            "success": True,
            "message": "User registered successfully."
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500


@app.route("/login", methods=["POST"])
def login():
    try:
        # Parse JSON data from request
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({
                "success": False,
                "error": "Username and password are required."
            }), 400

        # Load existing users
        users = load_users()

        if username not in users or users[username]["password"] != password:
            return jsonify({
                "success": False,
                "error": "Invalid username or password."
            }), 401

        return jsonify({
            "success": True,
            "message": "Login successful."
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500


@app.route("/track", methods=["POST"])
def track_number():
    try:
        # Parse JSON data from request
        data = request.get_json()
        number = data.get("number", "")

        if not number:
            return jsonify({
                "success": False,
                "error": "No phone number provided."
            }), 400

        # Call the tracking function
        details = track_phone_number(number)

        # Check if any error occurred during tracking
        if "Error" in details:
            return jsonify({
                "success": False,
                "data": details,
                "error": details.get("Error")
            }), 400

        # Return the successful response
        return jsonify({
            "success": True,
            "data": details
        }), 200

    except Exception as e:
        # Handle unexpected errors
        return jsonify({
            "success": False,
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
