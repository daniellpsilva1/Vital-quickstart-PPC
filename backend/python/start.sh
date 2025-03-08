#!/bin/bash
# Start the backend server
exec uvicorn main:app --host 0.0.0.0 --port $PORT