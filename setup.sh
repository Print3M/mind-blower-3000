#!/usr/bin/env bash

set -ueo pipefail

SCRIPT_DIR=$(dirname "$(realpath -s "$0")")
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

#===================================#
#          BACKEND SETUP            #
#===================================#

VENV_DIR="env"
VENV_BIN="$VENV_DIR/bin/activate"

cd "$BACKEND_DIR"
python3 -m virtualenv "$VENV_DIR"

# shellcheck source=backend/env/bin/activate
source "$VENV_BIN"
pip install -r "requirements.txt"
deactivate

echo -e "\n[+] Backend has been configured successfully\n"

#===================================#
#          FRONTEND SETUP           #
#===================================#

cd "$FRONTEND_DIR"
yarn install
yarn run build
echo -e "\n[+] Frontend has been configured successfully\n"

# Exit
cd "$SCRIPT_DIR"