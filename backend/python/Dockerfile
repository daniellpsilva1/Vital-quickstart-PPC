# Use the official Python image.
# https://hub.docker.com/_/python
FROM python:3.10

# Install system dependencies required for Python package compilation
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR /app

RUN pip install 'poetry==1.3.2'
COPY . .
COPY .env .env

# Export requirements but install with pip for better error handling
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# Upgrade pip and setuptools
RUN python -m pip install --upgrade pip setuptools wheel

# Install svix explicitly first with necessary dependencies
RUN pip install "cffi>=1.12.0" "cryptography>=3.4.0" "pycparser>=2.20" "svix" --no-cache-dir

# Install the rest of the requirements
RUN pip install -r requirements.txt --no-cache-dir

EXPOSE 8000
CMD exec uvicorn main:app --host 0.0.0.0 --port 8000
