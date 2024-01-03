#!/usr/bin/env bash

set -ueo pipefail

SCRIPT_DIR=$(dirname "$(realpath -s "$0")")
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

#===================================#
#           RUN FRONTEND            #
#===================================#
echo "[*] Wait for it..."

cd "$FRONTEND_DIR"
npm run start &

sleep 3
xdg-open "http://localhost:3000"

#===================================#
#           RUN BACKEND             #
#===================================#

VENV_BIN="env/bin/activate"

cd "$BACKEND_DIR"

# shellcheck source=backend/env/bin/activate
source "$VENV_BIN"
uvicorn main:app --reload