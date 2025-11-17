import os
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from pydantic import BaseModel
import scanner_logic  # We will create this next

app = FastAPI()

# This Pydantic model validates the incoming payload from Cloud Tasks
class ScanTaskPayload(BaseModel):
    job_id: str
    plan_level: str

@app.post("/run-scan")
async def run_scan_endpoint(payload: ScanTaskPayload, background_tasks: BackgroundTasks):
    """
    This is the only endpoint in our application.
    Google Cloud Tasks will send a POST request here.
    """
    try:
        print(f"Received scan job: {payload.job_id}")

        # We run the actual scan in the background.
        # This lets us immediately return a 200 OK to Cloud Tasks.
        # If we don't return 200 quickly, Cloud Tasks will think the job failed and retry.
        background_tasks.add_task(scanner_logic.run_scan, payload.job_id, payload.plan_level)

        return {"status": "accepted", "job_id": payload.job_id}

    except Exception as e:
        print(f"Error accepting job: {e}")
        raise HTTPException(status_code=500, detail="Failed to accept job")

@app.get("/")
def health_check():
    # Google Cloud Run needs a simple "/" endpoint for health checks
    return {"status": "ok"}
