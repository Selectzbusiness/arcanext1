import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import User, Repository, Workspace
from auth import get_or_create_user

router = APIRouter(prefix="/api/v1/repositories", tags=["Repositories"])

# GitHub App name from environment
GITHUB_APP_NAME = os.environ.get("GITHUB_APP_NAME", "arcanext")


def get_user_workspace(db: Session, user: User) -> Workspace:
    """Helper to get user's first workspace (users have one workspace for now)"""
    workspace = db.query(Workspace).filter(Workspace.owner_id == user.id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="User has no workspace")
    return workspace


@router.get("/", response_model=list[dict])
def get_user_repositories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    """Get all repositories for the current user's workspace"""
    workspace = get_user_workspace(db, current_user)
    
    repos = db.query(Repository).filter(Repository.workspace_id == workspace.id).all()
    return [
        {
            "id": str(repo.id),
            "repo_name": repo.repo_name,
            "provider": repo.provider,
            "external_id": repo.external_id
        }
        for repo in repos
    ]


@router.get("/github-install-url")
def get_github_install_url(current_user: User = Depends(get_or_create_user)):
    """Get the GitHub App installation URL"""
    return {
        "url": f"https://github.com/apps/{GITHUB_APP_NAME}/installations/new"
    }
