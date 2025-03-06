# Phone Tracking User Management

This project provides functionality for managing users in a phone tracking application. It includes features for adding users, handling mobile numbers, and retrieving location data based on those numbers.

## Features

- User registration with mobile number
- Password hashing for security
- Location retrieval based on mobile numbers (simulated)
- User data stored in a JSON file

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

To run the user management script, execute the following command:

```bash
python user_management.py
```

### Functions

#### load_users(file_path)

Loads user data from a specified JSON file.

- **Args**: 
  - `file_path` (str): The path to the JSON file containing user data.
- **Returns**: 
  - `dict`: A dictionary containing user data.

#### save_users(file_path, users)

Saves user data to a specified JSON file.

- **Args**:
  - `file_path` (str): The path to the JSON file to save user data.
  - `users` (dict): A dictionary containing user data to be saved.

#### hash_password(password)

Hashes a password using bcrypt.

- **Args**:
  - `password` (str): The password to be hashed.
- **Returns**:
  - `str`: The hashed password.

#### normalize_username(username)

Normalizes a username by stripping whitespace and converting to lowercase.

- **Args**:
  - `username` (str): The username to normalize.
- **Returns**:
  - `str`: The normalized username.

#### get_location_by_mobile(mobile_number)

Retrieves location data based on the provided mobile number (simulated).

- **Args**:
  - `mobile_number` (str): The mobile number to retrieve location for.
- **Returns**:
  - `dict`: A dictionary containing location data (state, district, pincode).

#### add_user_with_mobile(username, password, mobile_number, users)

Adds a new user with their mobile number and retrieves their location.

- **Args**:
  - `username` (str): The username of the new user.
  - `password` (str): The password for the new user.
  - `mobile_number` (str): The mobile number of the new user.
  - `users` (dict): The dictionary containing existing users.
- **Raises**:
  - `ValueError`: If the user already exists.

## Example Usage

```python
if __name__ == '__main__':
    users = load_users('users.json')
    add_user_with_mobile('new_user', 'new_password', '1234567890', users)
    save_users('users.json', users)
```

## License

This project is licensed under the MIT License.
