from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import User, Repository
from auth import get_or_create_user

router = APIRouter(prefix="/api/v1/repositories", tags=["Repositories"])

@router.get("/", response_model=list[dict])
def get_user_repositories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    if not hasattr(current_user, "workspace") or not current_user.workspace:
        raise HTTPException(status_code=404, detail="User has no workspace")

    repos = db.query(Repository).filter(Repository.workspace_id == current_user.workspace.id).all()
    return [
        {"id": repo.id, "repo_name": repo.repo_name, "provider": repo.provider}
        for repo in repos
    ]
