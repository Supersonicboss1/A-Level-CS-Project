from sqlmodel import SQLModel, create_engine  # noqa: F401

from . import schemas  # noqa: F401

sqlite_file_name = "db/database.sqlite"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)