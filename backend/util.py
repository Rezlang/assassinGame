import uuid
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from math import radians, sin, cos, sqrt, atan2


def new_id():
    return str(uuid.uuid4())


def haversine(pos1, pos2):
    lat1, lon1 = pos1
    lat2, lon2 = pos2
    # Radius of the Earth in feet
    R = 20902880

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance
