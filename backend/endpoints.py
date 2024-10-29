from flask import Flask, request, jsonify
import gameDirectory as gd
game_api = gd.GameDirectory()

app = Flask(__name__)


@app.route('/create_game', methods=['POST'])
def create_game():
    data = request.json
    owner_name = data.get('owner_name')
    owner_id = data.get('owner_id')
    if not owner_name or not owner_id:
        return jsonify({"error": "owner_name and owner_id are required"}), 400

    game_id = game_api.create_game(owner_name, owner_id)
    return jsonify({"game_id": game_id}), 201


@app.route('/join_game', methods=['POST'])
def join_game():
    data = request.json
    game_id = data.get('game_id')
    user_name = data.get('user_name')
    user_id = data.get('user_id')
    if not game_id or not user_name or not user_id:
        return jsonify({"error": "game_id, user_name, and user_id are required"}), 400

    try:
        msg = game_api.join_game(game_id, user_name, user_id)
        return jsonify({"message": msg}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


@app.route('/kill', methods=['POST'])
def kill():
    data = request.json
    game_id = data.get('game_id')
    killer_name = data.get('killer_name')
    killer_id = data.get('killer_id')
    if not game_id or not killer_name or not killer_id:
        return jsonify({"error": "game_id, killer_name, and killer_id are required"}), 400

    try:
        msg = game_api.kill(game_id, killer_name, killer_id)
        return jsonify({"message": msg}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


@app.route('/start_game', methods=['POST'])
def start_game():
    data = request.json
    game_id = data.get('game_id')
    user_id = data.get('user_id')
    if not game_id or not user_id:
        return jsonify({"error": "game_id and user_id are required"}), 400

    try:
        msg = game_api.start_game(game_id, user_id)
        return jsonify({"message": msg}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
