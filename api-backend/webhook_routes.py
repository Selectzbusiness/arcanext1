import os
import json
import hmac
import hashlib
import httpx
from fastapi import APIRouter, Request, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import get_db
from models import Repository, ScanJob, Workspace
from queue_service import enqueue_scan_task

router = APIRouter(prefix="/api/v1/webhooks")

GITHUB_WEBHOOK_SECRET = os.environ.get("GITHUB_WEBHOOK_SECRET", "").encode()
GITHUB_APP_ID = os.environ.get("GITHUB_APP_ID", "")
GITHUB_APP_PRIVATE_KEY = os.environ.get("GITHUB_APP_PRIVATE_KEY", "")

async def verify_github_signature(request: Request):
    signature = request.headers.get("X-Hub-Signature-256")
    if not signature:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Missing X-Hub-Signature-256")

    body = await request.body()
    expected_signature = "sha256=" + hmac.new(GITHUB_WEBHOOK_SECRET, body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected_signature):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid signature")
    return True

@router.post("/github", dependencies=[Depends(verify_github_signature)])
async def handle_github_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.json()

    # We only care about PRs being opened or updated (new commits)
    if "pull_request" not in payload or payload.get("action") not in ["opened", "synchronize"]:
        return {"message": "Event not relevant, skipping."}

    pr = payload["pull_request"]
    repo_external_id = str(payload["repository"]["id"])

    # 1. Find the repository in our database
    db_repo = db.query(Repository).filter(Repository.external_id == repo_external_id).first()
    if not db_repo:
        # If we don't know this repo, we can't scan it
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Repository {repo_external_id} not found in Arcanext")

    # 2. Get the workspace plan level
    plan_level = db_repo.workspace.plan_level

    # 3. Create the ScanJob in our database
    new_job = ScanJob(
        repository_id=db_repo.id,
        plan_level=plan_level,
        status="queued",
        commit_sha=pr["head"]["sha"],
        pr_number=pr["number"]
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    # 4. Enqueue the job to Google Cloud Tasks
    try:
        enqueue_scan_task(job_id=str(new_job.id), plan_level=plan_level)
    except Exception as e:
        # If queueing fails, mark the job as 'failed'
        new_job.status = "failed"
        db.commit()
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Failed to enqueue job: {e}")

    return {"job_id": str(new_job.id), "status": "queued"}


@router.post("/github/installation")
async def handle_github_installation(request: Request, db: Session = Depends(get_db)):
    """
    Handle GitHub App installation webhook.
    This is called when a user installs the GitHub App on their repositories.
    """
    payload = await request.json()
    action = payload.get("action")
    
    if action not in ["created", "added"]:
        return {"message": f"Ignoring action: {action}"}
    
    installation = payload.get("installation", {})
    installation_id = installation.get("id")
    
    # Get the repositories that were added
    repositories = payload.get("repositories", [])
    if action == "added":
        repositories = payload.get("repositories_added", [])
    
    if not repositories:
        return {"message": "No repositories in payload"}
    
    # For now, we'll need to associate these repos with a workspace
    # In production, you'd use the installation_id to look up the user
    # This is a simplified version - you'd need proper user association
    
    added_repos = []
    for repo in repositories:
        repo_name = repo.get("full_name")
        external_id = str(repo.get("id"))
        
        # Check if repo already exists
        existing = db.query(Repository).filter(Repository.external_id == external_id).first()
        if existing:
            continue
        
        # Note: In production, you need to associate with the correct workspace
        # This requires storing installation_id -> user mapping
        added_repos.append({
            "repo_name": repo_name,
            "external_id": external_id
        })
    
    return {
        "message": f"Processed {len(added_repos)} repositories",
        "installation_id": installation_id,
        "repositories": added_repos
    }
