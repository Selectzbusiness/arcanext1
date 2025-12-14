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


class SyncInstallationRequest(BaseModel):
    installation_id: str


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


# GitHub App credentials for installation access
GITHUB_APP_ID = os.environ.get("GITHUB_APP_ID", "")
GITHUB_APP_PRIVATE_KEY = os.environ.get("GITHUB_APP_PRIVATE_KEY", "")


def get_github_app_jwt():
    """Generate a JWT for GitHub App authentication"""
    import jwt
    import time
    
    if not GITHUB_APP_ID or not GITHUB_APP_PRIVATE_KEY:
        return None
    
    now = int(time.time())
    payload = {
        "iat": now - 60,  # Issued 60 seconds ago
        "exp": now + (10 * 60),  # Expires in 10 minutes
        "iss": GITHUB_APP_ID,
    }
    
    # Handle private key - it might be base64 encoded or have escaped newlines
    private_key = GITHUB_APP_PRIVATE_KEY.replace("\\n", "\n")
    
    return jwt.encode(payload, private_key, algorithm="RS256")


async def get_installation_access_token(installation_id: str) -> str:
    """Get an access token for a specific GitHub App installation"""
    app_jwt = get_github_app_jwt()
    if not app_jwt:
        raise HTTPException(
            status_code=500,
            detail="GitHub App not configured. Please set GITHUB_APP_ID and GITHUB_APP_PRIVATE_KEY."
        )
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.github.com/app/installations/{installation_id}/access_tokens",
            headers={
                "Authorization": f"Bearer {app_jwt}",
                "Accept": "application/vnd.github.v3+json",
            }
        )
        
        if response.status_code != 201:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Failed to get installation access token: {response.text}"
            )
        
        return response.json()["token"]


@router.post("/github/sync-installation")
async def sync_github_app_installation(
    request: SyncInstallationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_or_create_user)
):
    """
    Sync repositories from a GitHub App installation.
    Called after user installs the GitHub App and is redirected back.
    """
    workspace = get_user_workspace(db, current_user)
    
    try:
        # Get installation access token
        access_token = await get_installation_access_token(request.installation_id)
        
        # Fetch repositories accessible to this installation
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.github.com/installation/repositories",
                headers={
                    "Authorization": f"token {access_token}",
                    "Accept": "application/vnd.github.v3+json",
                },
                params={"per_page": 100}
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch installation repositories"
                )
            
            data = response.json()
            repos = data.get("repositories", [])
        
        # Sync each repository
        synced_repos = []
        for repo in repos:
            # Check if already exists
            existing = db.query(Repository).filter(
                Repository.workspace_id == workspace.id,
                Repository.repo_name == repo["full_name"]
            ).first()
            
            if not existing:
                new_repo = Repository(
                    workspace_id=workspace.id,
                    repo_name=repo["full_name"],
                    provider="github",
                    external_id=str(repo["id"])
                )
                db.add(new_repo)
                synced_repos.append(repo["full_name"])
        
        db.commit()
        
        return {
            "message": f"Synced {len(synced_repos)} new repositories",
            "synced_repos": synced_repos,
            "total_repos": len(repos)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sync failed: {str(e)}")


@router.get("/github/installations")
async def get_github_installations(
    current_user: User = Depends(get_or_create_user)
):
    """
    Get GitHub App installations for the authenticated user.
    Note: This requires the user to have authorized the GitHub App.
    """
    app_jwt = get_github_app_jwt()
    if not app_jwt:
        return {"installations": [], "message": "GitHub App not configured"}
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.github.com/app/installations",
                headers={
                    "Authorization": f"Bearer {app_jwt}",
                    "Accept": "application/vnd.github.v3+json",
                }
            )
            
            if response.status_code != 200:
                return {"installations": [], "message": "Failed to fetch installations"}
            
            installations = response.json()
            return {
                "installations": [
                    {
                        "id": inst["id"],
                        "account": inst["account"]["login"],
                        "account_type": inst["account"]["type"],
                        "repository_selection": inst.get("repository_selection", "all"),
                    }
                    for inst in installations
                ]
            }
    except Exception as e:
        return {"installations": [], "message": str(e)}
