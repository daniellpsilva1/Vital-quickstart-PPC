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

# Copy application code
COPY . .
COPY .env .env

# Upgrade pip and setuptools
RUN python -m pip install --upgrade pip setuptools wheel

# Install dependencies in a specific order to avoid conflicts
RUN pip install "cffi>=1.12.0" "pycparser>=2.20" "cryptography>=3.4.0" --no-cache-dir
RUN pip install "svix>=0.41.2,<0.42.0" --no-cache-dir --use-deprecated=legacy-resolver || echo "Failed to install svix, continuing anyway"
RUN pip install "python-dotenv>=0.20.0" "fastapi>=0.77.1" "uvicorn>=0.17.6" --no-cache-dir
RUN pip install "vital>=1.1.22" --no-cache-dir

EXPOSE 8000
CMD exec uvicorn main:app --host 0.0.0.0 --port 8000
