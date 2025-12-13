import os
import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from db import get_db
from models import User, Repository, Workspace
from auth import get_or_create_user

router = APIRouter(prefix="/api/v1/repositories", tags=["Repositories"])

# GitHub App name from environment
GITHUB_APP_NAME = os.environ.get("GITHUB_APP_NAME", "arcanext")


class GitHubTokenRequest(BaseModel):
    github_token: str


class ConnectRepoRequest(BaseModel):
    repo_name: str
    github_token: str


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


@router.post("/github/user-repos")
async def get_github_user_repos(
    request: GitHubTokenRequest,
    current_user: User = Depends(get_or_create_user)
):
    """
    Fetch the user's GitHub repositories using their OAuth access token.
    This allows users who signed in with GitHub to see their repos directly.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.github.com/user/repos",
                headers={
                    "Authorization": f"token {request.github_token}",
                    "Accept": "application/vnd.github.v3+json",
                },
                params={
                    "sort": "updated",
                    "per_page": 100,
                    "type": "all",
                }
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch GitHub repositories"
                )
            
            repos = response.json()
            return [
                {
                    "id": repo["id"],
                    "name": repo["name"],
                    "full_name": repo["full_name"],
                    "private": repo["private"],
                    "description": repo["description"],
                    "html_url": repo["html_url"],
                    "default_branch": repo["default_branch"],
                    "updated_at": repo["updated_at"],
                }
                for repo in repos
            ]
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"GitHub API error: {str(e)}")


@router.post("/github/connect")
async def connect_github_repo(
    request: ConnectRepoRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    """
    Connect a GitHub repository for scanning.
    This creates a repository record in our database.
    """
    workspace = get_user_workspace(db, current_user)
    
    # Check if repo already connected
    existing = db.query(Repository).filter(
        Repository.workspace_id == workspace.id,
        Repository.repo_name == request.repo_name
    ).first()
    
    if existing:
        return {
            "id": str(existing.id),
            "repo_name": existing.repo_name,
            "provider": existing.provider,
            "message": "Repository already connected"
        }
    
    # Verify the repo exists and user has access
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.github.com/repos/{request.repo_name}",
                headers={
                    "Authorization": f"token {request.github_token}",
                    "Accept": "application/vnd.github.v3+json",
                }
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=404,
                    detail="Repository not found or you don't have access"
                )
            
            repo_data = response.json()
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"GitHub API error: {str(e)}")
    
    # Create the repository record
    new_repo = Repository(
        workspace_id=workspace.id,
        repo_name=request.repo_name,
        provider="github",
        external_id=str(repo_data["id"])
    )
    db.add(new_repo)
    db.commit()
    db.refresh(new_repo)
    
    return {
        "id": str(new_repo.id),
        "repo_name": new_repo.repo_name,
        "provider": new_repo.provider,
        "message": "Repository connected successfully"
    }
