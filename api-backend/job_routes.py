from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import User, ScanJob, Repository, Workspace
from auth import get_or_create_user
from typing import List

router = APIRouter(prefix="/api/v1/jobs", tags=["Jobs"])


def get_user_workspace(db: Session, user: User) -> Workspace:
    """Helper to get user's first workspace"""
    workspace = db.query(Workspace).filter(Workspace.owner_id == user.id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="User has no workspace")
    return workspace


@router.get("/", response_model=List[dict])
def get_user_scan_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    """Get all scan jobs for the current user's workspace"""
    workspace = get_user_workspace(db, current_user)

    jobs = db.query(ScanJob).join(Repository).filter(
        Repository.workspace_id == workspace.id
    ).order_by(ScanJob.created_at.desc()).limit(50).all()

    return [
        {
            "id": str(job.id),
            "status": job.status,
            "commit_sha": job.commit_sha,
            "pr_number": job.pr_number,
            "created_at": job.created_at.isoformat() if job.created_at else None,
            "completed_at": job.completed_at.isoformat() if job.completed_at else None,
            "repository_id": str(job.repository_id)
        } for job in jobs
    ]


@router.get("/stats")
def get_user_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    """Get dashboard statistics for the current user"""
    workspace = get_user_workspace(db, current_user)
    
    repo_count = db.query(Repository).filter(Repository.workspace_id == workspace.id).count()
    scan_count = db.query(ScanJob).join(Repository).filter(
        Repository.workspace_id == workspace.id
    ).count()
    
    # Placeholder for vulnerability count (would come from scan results)
    vulnerability_count = 0
    
    return {
        "repo_count": repo_count,
        "scan_count": scan_count,
        "vulnerability_count": vulnerability_count
    }
