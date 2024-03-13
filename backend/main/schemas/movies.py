from enum import Enum
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class UserMovieLink(
    SQLModel, table=True
):  # join table for movies a user likes/has watched
    user_id: int = Field(foreign_key="user.id", primary_key=True, default=None)
    movie_id: int = Field(foreign_key="movie.id", primary_key=True, default=None)


class ActorMovieLink(SQLModel, table=True):  # join table for actors in a movie
    actor_id: int = Field(foreign_key="actor.id", primary_key=True, default=None)
    movie_id: int = Field(foreign_key="movie.id", primary_key=True, default=None)


class TagMovieLink(SQLModel, table=True):  # join table for tags on a movie
    tag_id: int = Field(foreign_key="tag.id", primary_key=True, default=None)
    movie_id: int = Field(foreign_key="movie.id", primary_key=True, default=None)


class AgeRatings(Enum):
    ANY = "Any"
    U = "U"
    PG = "PG"
    TWELVE = "12"
    TWELVEA = "12A"
    FIFTEEN = "15"
    EIGHTEEN = "18"


class MovieBase(SQLModel):
    id: Optional[int] = Field(
        default=None, primary_key=True
    )  # only done like this so that id is first in the table
    title: str
    description: str
    poster_url: str
    year: int
    rating: float
    genre: str
    runtime: int  # in minutes
    age_rating: AgeRatings


class Movie(MovieBase, table=True):
    actors: List["Actor"] = Relationship(
        back_populates="actor_movies", link_model=ActorMovieLink
    )
    tags: List["Tag"] = Relationship(
        back_populates="tagged_movies", link_model=TagMovieLink
    )


class MovieCreate(MovieBase):  # Used for creating movies
    id: None = None
    actors: List[str]
    tags: List[str]


class MovieRead(MovieCreate):  # Used for reading movies
    id: int


class MovieWithScore(MovieRead):
    score: int


class Actor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    actor_movies: List[Movie] = Relationship(
        back_populates="actors", link_model=ActorMovieLink
    )


class Tag(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    tagged_movies: List[Movie] = Relationship(
        back_populates="tags", link_model=TagMovieLink
    )
