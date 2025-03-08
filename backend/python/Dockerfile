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

# Copy only the dependency files first to leverage Docker cache
COPY pyproject.toml poetry.lock* ./

# Install Poetry
RUN pip install poetry==1.3.2

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy the rest of the application
COPY . .

EXPOSE 8000
CMD exec uvicorn main:app --host 0.0.0.0 --port 8000
