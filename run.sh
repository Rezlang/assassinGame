#!/bin/bash

ssh moskoj@pskproject.cs.rpi.edu << 'EOF'
    cd assassinGame/backend

    pkill -f "/home/moskoj/assassinGame/backend/assassin/bin/python3 endpoints.py" || true
    
    source assassin/bin/activate
    
    nohup python3 endpoints.py > endpoints.log 2>&1 &
EOF
