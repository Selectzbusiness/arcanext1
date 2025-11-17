


from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine

from models import User
from auth import get_or_create_user
from webhook_routes import router as webhook_router
from repository_routes import router as repository_router
from job_routes import router as job_router




app = FastAPI()

# Allowed origins for CORS
origins = [
    "http://localhost:3000",  # The default for Next.js dev
    "https://arcanext-web.vercel.app"  # Your future Vercel URL (replace if needed)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "Arcanext API"}


# Protected route to verify login and get user data
@app.get("/api/v1/auth/me")
def get_current_user_data(current_user: User = Depends(get_or_create_user)):
    """
    Protected route.
    When a user hits this, it verifies their Firebase token (via the dependency).
    If the user doesn't exist in our DB, they are created.
    It then returns the user's data from our Postgres DB.
    """
    return {
        "id": current_user.id,
        "email": current_user.email,
        "firebase_uid": current_user.firebase_uid
    }

# Register routers
app.include_router(webhook_router)
app.include_router(repository_router)
app.include_router(job_router)
