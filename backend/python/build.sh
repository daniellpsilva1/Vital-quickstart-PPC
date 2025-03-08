#!/bin/bash
set -e

# Install system dependencies
apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Upgrade pip and setuptools
pip install --upgrade pip setuptools wheel

# Install dependencies directly
pip install \
    cffi==1.15.1 \
    pycparser==2.21 \
    cryptography==38.0.4 \
    python-dotenv==0.20.0 \
    fastapi==0.77.1 \
    uvicorn==0.17.6 \
    vital==1.1.22 \
    --no-cache-dir

echo "Build completed successfully" 