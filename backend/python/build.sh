#!/bin/bash
set -e

# Install system dependencies
apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Poetry
pip install poetry==1.3.2

# Install project dependencies
poetry config virtualenvs.create false
poetry install --no-interaction --no-ansi

echo "Build completed successfully with Poetry" 