import json
import bcrypt

# Load user data from JSON file

def load_users(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Save user data to JSON file

def save_users(file_path, users):
    with open(file_path, 'w') as file:
        json.dump(users, file, indent=4)

# Hash a password

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Add a new user

def add_user(username, password, users):
    if username in users:
        raise ValueError('User already exists.')
    hashed_password = hash_password(password)
    users[username] = {'password': hashed_password}

# Example usage
if __name__ == '__main__':
    users = load_users('users.json')
    add_user('new_user', 'new_password', users)
    save_users('users.json', users)

    hashed_password = hash_password(password)
    users[normalize_username(username)] = {'password': hashed_password}

# Example function to train a simple model

def train_model(features, labels):
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    return accuracy

# Example usage
if __name__ == '__main__':
    users = load_users('users.json')
    add_user('new_user', 'new_password', users)
    save_users('users.json', users)
    # Placeholder for features and labels
    # accuracy = train_model(features, labels)
    # print(f'Model accuracy: {accuracy}')

        username (str): The username to normalize.
    
    Returns:
        str: The normalized username.
    """
    return username.strip().lower()

# Add a new user

def add_user(username, password, users):
    """
    Add a new user to the users dictionary.
    
    Args:
        username (str): The username of the new user.
        password (str): The password for the new user.
        users (dict): The dictionary containing existing users.
    
    Raises:
        ValueError: If the user already exists.
    """
    if normalize_username(username) in [normalize_username(u) for u in users]:
        raise ValueError('User already exists.')
    hashed_password = hash_password(password)
    users[normalize_username(username)] = {'password': hashed_password}

# Example function to train a simple model

def train_model(features, labels):
    """
    Train a logistic regression model on the provided features and labels.
    
    Args:
        features (array-like): The input features for the model.
        labels (array-like): The target labels for the model.
    
    Returns:
        float: The accuracy of the trained model on the test set.
    """
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    return accuracy

# Example usage
if __name__ == '__main__':
    users = load_users('users.json')
    add_user('new_user', 'new_password', users)
    save_users('users.json', users)
    # Placeholder for features and labels
    # accuracy = train_model(features, labels)
    # print(f'Model accuracy: {accuracy}')

        username (str): The username of the new user.
        password (str): The password for the new user.
        mobile_number (str): The mobile number of the new user.
        users (dict): The dictionary containing existing users.
    
    Raises:
        ValueError: If the user already exists.
    """
    if normalize_username(username) in [normalize_username(u) for u in users]:
        raise ValueError('User already exists.')
    hashed_password = hash_password(password)
    location_data = get_location_by_mobile(mobile_number)
    users[normalize_username(username)] = {
        'password': hashed_password,
        'mobile_number': mobile_number,
        'location': location_data
    }

# Example function to train a simple model

def train_model(features, labels):
    """
    Train a logistic regression model on the provided features and labels.
    
    Args:
        features (array-like): The input features for the model.
        labels (array-like): The target labels for the model.
    
    Returns:
        float: The accuracy of the trained model on the test set.
    """
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    model = LogisticRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    return accuracy

# Example usage
if __name__ == '__main__':
    users = load_users('users.json')
    add_user_with_mobile('new_user', 'new_password', '1234567890', users)
    save_users('users.json', users)
    # Placeholder for features and labels
    # accuracy = train_model(features, labels)
    # print(f'Model accuracy: {accuracy}')
