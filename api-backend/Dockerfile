# Start from a standard Python 3.11 slim image
FROM python:3.11-slim

# Set a working directory inside the container
WORKDIR /app

# Install system-level dependencies (like psycopg2 needs)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file first
COPY requirements.txt .

# Install all our Python libraries
# We use '--no-cache-dir' to keep the image size small
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of our application code into the container
COPY . .

# This container will run as a web server on port 8080.
# Google Cloud Run will send traffic to this port.
ENV PORT 8080

# The command to start our FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]