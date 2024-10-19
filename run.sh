#!/bin/bash

# Function for logging with timestamp
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - INFO - $1"
}

# Define the ports for API and UI
API_PORT=8080  # Replace with your actual API port
UI_PORT=5173   # Replace with your actual UI port

# Kill any process using the API port
if lsof -i:$API_PORT -t >/dev/null; then
  echo "Killing process on port $API_PORT"
  kill -9 $(lsof -i:$API_PORT -t)
fi

# Kill any process using the UI port
if lsof -i:$UI_PORT -t >/dev/null; then
  echo "Killing process on port $UI_PORT"
  kill -9 $(lsof -i:$UI_PORT -t)
fi

set -euo pipefail

log_info "Starting the Python API and Vite frontend servers..."

PROJECT_ROOT=$(pwd)
API_DIR="$PROJECT_ROOT/api"
UI_DIR="$PROJECT_ROOT/ui"

source "$PROJECT_ROOT/.venv/bin/activate"

cd "$API_DIR"
log_info "Starting Python API..."
python serve.py &

API_PID=$!

cd "$UI_DIR"
log_info "Starting Vite development server..."
npm run dev &

UI_PID=$!

# Wait for both API and UI processes to complete
log_info "Waiting for both servers to finish..."
wait $API_PID
log_info "Python API has stopped."

wait $UI_PID
log_info "Vite frontend server has stopped."

log_info "Both processes have completed."
