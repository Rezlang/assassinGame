import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def add_user(user_id, user_name):
    doc_ref = db.collection('users').document(user_id)

    doc_ref.set({
        'id': user_id,
        'name': user_name,
        'active_game': []
    })


def new_game(game_id, owner_id, round_time_minutes=1, shuffle_targets=False, kill_radius_feet=50, game_status="waiting_for_players"):
    doc_ref = db.collection('games').document(game_id)

    doc_ref.set({
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
        "rounds": {}
    })


def add_player_to_game(game_id, player_id):
    doc_ref = db.collection('games').document(game_id)

    doc_ref.update({
        "all_players": firestore.ArrayUnion([player_id])
    })


def add_player_to_game(game_id, player_id):
    doc_ref = db.collection('games').document(game_id)

    doc_ref.update({
        "all_players": firestore.ArrayUnion([player_id])
    })


def add_round(game_id, round_number, targets):
    doc_ref = db.collection('games').document(game_id)

    doc_ref.update({
        f"rounds.{round_number}": targets
    })


cred = credentials.Certificate(
    "./assasingame-a6626-firebase-adminsdk-qhtmq-40eeea4de0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

input("new game\n")
game_id = "0"
new_game(game_id, "1")
input("add_player_to_game 2\n")
add_player_to_game(game_id, "2")
input("add_player_to_game 3\n")
add_player_to_game(game_id, "3")
input("add_round 0\n")
add_round(game_id, "0", {"1": "2", "2": "3", "3": "1"})
input("add_round 1\n")
add_round(game_id, "1", {"1": "2", "2": "1"})
