import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def new_id():
    return str(uuid.uuid4())

def init_firebase():
    cred = credentials.Certificate(
    "./assasingame-a6626-firebase-adminsdk-qhtmq-40eeea4de0.json")
    firebase_admin.initialize_app(cred)
    return firestore.client()