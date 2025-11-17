from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import User, ScanJob, Repository
from auth import get_or_create_user
from typing import List

router = APIRouter(prefix="/api/v1/jobs", tags=["Jobs"])

@router.get("/", response_model=List[dict])
def get_user_scan_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    if not hasattr(current_user, "workspace") or not current_user.workspace:
        raise HTTPException(status_code=404, detail="User has no workspace")

    jobs = db.query(ScanJob).join(Repository).filter(
        Repository.workspace_id == current_user.workspace.id
    ).order_by(ScanJob.created_at.desc()).limit(50).all()

    return [
        {
            "id": job.id,
            "status": job.status,
            "commit_sha": job.commit_sha,
            "pr_number": job.pr_number,
            "created_at": job.created_at,
            "repository_id": job.repository_id
        } for job in jobs
    ]
