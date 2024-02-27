import json
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from routers.auth import router as auth_router
from routers.userdata import router as userdata_router


from .db import SQLModel, engine  # noqa: F401


@asynccontextmanager
async def lifespan(api: FastAPI):
    # before start
    spec = api.openapi()
    with open("openapi.json", "w") as f:
        f.write(json.dumps(spec, indent=2))
    print("Creating database and tables")
    create_db_and_tables()
    yield
    # after end

api = FastAPI(lifespan=lifespan) # noqa: E305


api.include_router(auth_router, prefix="/auth")
api.include_router(
    userdata_router,
    prefix="/userdata",)



def create_db_and_tables():
    SQLModel.metadata.create_all(engine)