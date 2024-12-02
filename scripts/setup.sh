#!/bin/bash

# function to log info
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - INFO - $1"
}

# Check if Python virtual environment exists
if [[ ! -d ".venv" ]]; then
  log_info "Creating Python virtual environment..."
  python3 -m venv .venv
  if [[ $? -ne 0 ]]; then
    log_info "Failed to create Python virtual environment. Please ensure Python 3 is installed."
    exit 1
  fi
fi

# Activate the virtual environment
log_info "Activating Python virtual environment..."
source .venv/bin/activate > /dev/null

if [[ $? -ne 0 ]]; then
  log_info "Failed to activate Python virtual environment. Please check your setup."
  exit 1
fi

# Install Python dependencies
log_info "Installing Python dependencies..."
pip install -r api/requirements.txt
if [[ $? -ne 0 ]]; then
  log_info "Failed to install Python dependencies. Please check requirements.txt."
  deactivate
  exit 1
fi

# Install Node.js dependencies for the UI
log_info "Installing Node.js dependencies..."
npm install --prefix ui
if [[ $? -ne 0 ]]; then
  log_info "Failed to install Node.js dependencies. Please ensure Node.js and npm are installed."
  deactivate
  exit 1
fi

log_info "Setup completed successfully."
deactivate
