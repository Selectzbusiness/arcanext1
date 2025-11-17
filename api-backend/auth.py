# THIS IS THE FULL, CORRECT AUTH.PY FILE
# PASTE THIS ENTIRE BLOCK

import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from db import get_db
from models import User, Workspace

# Initialize Firebase Admin
# This happens automatically on Google Cloud Run
try:
    firebase_admin.initialize_app()
except ValueError:
    pass  # App already initialized

# This dependency will look for a Bearer token in the Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_firebase_user(token: str = Depends(oauth2_scheme)):
    """
    Verifies the Firebase ID Token.
    Returns the decoded token (a dict with user info).
    """
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except auth.ExpiredIdTokenError:
        # ---- THIS IS THE FIX ----
        # The 'raise' line MUST be indented
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Firebase token has expired. Please re-authenticate.",
        )
    except auth.InvalidIdTokenError:
        # ---- THIS IS THE FIX ----
        # This 'raise' line MUST also be indented
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Firebase ID Token.",
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

def get_or_create_user(
    db: Session = Depends(get_db),
    firebase_user: dict = Depends(get_firebase_user)
) -> User:
    """
    This is the core dependency for all protected routes.
    It verifies the Firebase token AND gets/creates our internal user in Postgres.
    """
    firebase_uid = firebase_user["uid"]
    user_email = firebase_user.get("email")

    # Check if user already exists in our Postgres DB
    db_user = db.query(User).filter(User.firebase_uid == firebase_uid).first()

    if db_user:
        return db_user

    # User does not exist in Postgres, so let's create them
    if not user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Firebase user has no email. Cannot create Arcanext account.",
        )

    # Create the new user
    new_user = User(
        firebase_uid=firebase_uid,
        email=user_email
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Also create their default workspace
    new_workspace = Workspace(
        owner_id=new_user.id,
        plan_level='free'  # Default plan
    )
    db.add(new_workspace)
    db.commit()

    return new_user