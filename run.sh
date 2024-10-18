#!/bin/bash

export PATH=$(pwd)

source .venv/bin/activate

cd ./api

python serve.py

wait
