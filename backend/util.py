import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def new_id():
    return str(uuid.uuid4())


def init_firebase():
    if not firebase_admin._apps:  # Check if an app instance already exists
        cred = credentials.Certificate("path/to/your/serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
    return firebase_admin.get_app()
