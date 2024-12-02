#!/bin/bash


log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - INFO - $1"
}

API_PORT=8080  
UI_PORT=5173

if lsof -i:$API_PORT -t >/dev/null; then
  echo "process on port $API_PORT is running"
  exit 1
fi

if lsof -i:$UI_PORT -t >/dev/null; then
  echo "process on port $UI_PORT is running"
  exit 1
fi

set -euo pipefail

log_info "Starting the Python API and Vite frontend servers..."

PROJECT_ROOT=$(pwd)
API_DIR="$PROJECT_ROOT/api"
UI_DIR="$PROJECT_ROOT/ui"

if [[ ! -d ".venv" ]]; then
  log_info "Python virtual environment not found. Please run setup.sh first."
  exit 1
fi

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