# fb.py

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Firebase
cred = credentials.Certificate(
    "./assasingame-a6626-firebase-adminsdk-qhtmq-40eeea4de0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_user(user_id, user_name):
    doc_ref = db.collection('users').document(user_id)
    doc_ref.set({
        'id': user_id,
        'name': user_name,
        'active_game': []
    })


def new_game(game_id, owner_id, round_time_minutes=1, shuffle_targets=False, kill_radius_feet=50, game_status="waiting_for_players"):
    doc_ref = db.collection('games').document(game_id)
    data = {
        "game_settings": {
            "id": game_id,
            "owner_id": owner_id,
            "round_time_minutes": round_time_minutes,
            "shuffle_targets": shuffle_targets,
            "kill_radius_feet": kill_radius_feet,
            "game_status": game_status,
            "game_owner": owner_id
        },
        "all_players": [],
        "alive_players": [],
        "rounds": {},
        "winner": {}
    }
    doc_ref.set(data)
    return data


def add_player_to_game(game_id, player_data):
    doc_ref = db.collection('games').document(game_id)
    doc_ref.update({
        "all_players": firestore.ArrayUnion([player_data]),
        "alive_players": firestore.ArrayUnion([player_data])
    })


def update_game_status(game_id, game_status):
    doc_ref = db.collection('games').document(game_id)
    doc_ref.update({
        "game_settings.game_status": game_status
    })


def get_game_data(game_id):
    doc_ref = db.collection('games').document(game_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return None


def update_round(game_id, round_number, targets):
    doc_ref = db.collection('games').document(game_id)
    doc_ref.update({
        f"rounds.{round_number}": targets
    })


def update_alive_players(game_id, alive_players):
    doc_ref = db.collection('games').document(game_id)
    doc_ref.update({
        "alive_players": alive_players
    })


def remove_alive_player(game_id, player_data):
    doc_ref = db.collection('games').document(game_id)
    doc_ref.update({
        "alive_players": firestore.ArrayRemove([player_data])
    })


def update_winner(game_id, winner_data):
    doc_ref = db.collection('games').document(game_id)
    doc_ref.update({
        "winner": winner_data,
        "game_settings.game_status": "completed"
    })


def get_alive_players(game_id):
    game_data = get_game_data(game_id)
    if game_data:
        return game_data.get('alive_players', [])
    else:
        return []


def get_round_targets(game_id, round_number):
    game_data = get_game_data(game_id)
    if game_data:
        rounds = game_data.get('rounds', {})
        return rounds.get(str(round_number), {})
    else:
        return {}
