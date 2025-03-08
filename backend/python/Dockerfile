# Use the official Python image.
# https://hub.docker.com/_/python
FROM python:3.10-slim

# Install system dependencies required for Python package compilation
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR /app

# Copy application code
COPY main.py .
COPY .env .

# Upgrade pip and setuptools
RUN python -m pip install --upgrade pip setuptools wheel

# Install dependencies directly without using Poetry
RUN pip install \
    cffi==1.15.1 \
    pycparser==2.21 \
    cryptography==38.0.4 \
    python-dotenv==0.20.0 \
    fastapi==0.77.1 \
    uvicorn==0.17.6 \
    vital==1.1.22 \
    --no-cache-dir

EXPOSE 8000
CMD exec uvicorn main:app --host 0.0.0.0 --port 8000
