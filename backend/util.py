import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def new_id():
    return str(uuid.uuid4())
