#!/bin/bash
# Start the backend server
# Use the $PORT environment variable set by Render
exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}