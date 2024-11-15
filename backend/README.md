# Assassin Game Backend readme

## Installation instructions
To start backend, git clone the repository and switch to the backend branch.
git pull
Ensure python and node are installed
pip install firebase
pip install firebase-admin
pip install uuid
npm install
ensure firebase credentials file is in local repo and pointed to correctly in firebase.py:init_firebase()
python3 endpoints.py

## Example inputs
### Create a game
curl -X POST http://128.000.000.108:5000/create_game -H "Content-Type: application/json" -d '{"owner_name": "sara", "owner_id": "123"}'

### Join a game
curl -X POST http://128.000.000.108:5000/join_game -H "Content-Type: application/json" -d '{"game_id": "", "user_name": "Bob", "user_id": "456"}'

### Start a game
curl -X POST http://128.000.000.108:5000/start_game -H "Content-Type: application/json" -d '{"game_id": "", "user_id": "123"}'

### Kill
curl -X POST http://128.000.000.108:5000/kill -H "Content-Type: application/json" -d '{"game_id": "", "killer_name": "Bob", "killer_id": "456"}'

### Get a Target
curl -X POST http://128.000.000.108:5000/get_target -H "Content-Type: application/json" -d '{"game_id": "", "killer_name": "Bob", "killer_id": "456"}'

If running locally, replace IP with localhost, otherwise use the machine's ip in http address. Replace the game_id in commands 2-4 with the id returned after success of event 1.