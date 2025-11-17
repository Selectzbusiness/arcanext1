import os
import json
import time
import google.cloud.tasks_v2
from google.protobuf.timestamp_pb2 import Timestamp

# Initialize the Cloud Tasks client as None
tasks_client = None

# Get config from environment variables
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT")
QUEUE_LOCATION = os.environ.get("GOOGLE_CLOUD_TASKS_LOCATION")
QUEUE_ID = os.environ.get("GOOGLE_CLOUD_TASKS_QUEUE")
SCAN_JOB_HANDLER_URL = os.environ.get("SCAN_JOB_HANDLER_URL")

def enqueue_scan_task(job_id: str, plan_level: str):
    global tasks_client

    # Initialize the client if it's not already initialized
    if tasks_client is None:
        tasks_client = google.cloud.tasks_v2.CloudTasksClient()

    parent = tasks_client.queue_path(PROJECT_ID, QUEUE_LOCATION, QUEUE_ID)

    # Construct the task payload
    task_payload = {"job_id": str(job_id), "plan_level": plan_level}

    # Construct the task
    task = {
        "http_request": {
            "http_method": google.cloud.tasks_v2.HttpMethod.POST,
            "url": SCAN_JOB_HANDLER_URL,
            "headers": {"Content-type": "application/json"},
            "body": json.dumps(task_payload).encode(),
            "oauth_token": {
                "service_account_email": os.environ.get("SERVICE_ACCOUNT_EMAIL")
            }
        },
    }

    # Set a 60-minute deadline (our max scan time)
    in_seconds = 60 * 60
    now = time.time()
    schedule_time = Timestamp()
    schedule_time.seconds = int(now + in_seconds)
    task["schedule_time"] = schedule_time

    # Use the client to create the task
    tasks_client.create_task(parent=parent, task=task)
    print(f"Enqueued task for job {job_id}")
