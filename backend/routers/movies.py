from typing import List, Literal

from fastapi import APIRouter, HTTPException
from main.db import engine
from main.schemas.admin import Admin
from main.schemas.movies import Actor, Movie, MovieCreate, MovieRead, Tag
from sqlmodel import Session, select

router = APIRouter()


@router.post("/add", response_model=Literal[True])
def add_movie(movie_data: MovieCreate, id: int, token: str):
    with Session(engine) as session:
        # check the user is an admin
        admin = session.get(Admin, id)
        if admin is None:
            raise HTTPException(status_code=404, detail="Admin not found")
        if admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")
        # ? Errors I ran into here:
        # ? 1. I forgot to commit
        # ? 2. I forgot to add the actors and tags to the movie object
        # ? 3. The relationships were set up incorrectly
        actors_class: List[Actor] = [
            Actor(name=actor.title()) for actor in movie_data.actors
        ]
        session.add_all(actors_class)
        tags_class: List[Tag] = [
            Tag(name=tag) for tag in movie_data.tags
        ]  # can't use title() here because of tags like "sci-fi" or WW2.
        session.add_all(tags_class)
        movie = Movie(
            tags=tags_class,
            actors=actors_class,
            title=movie_data.title.title(),
            description=movie_data.description,
            poster_url=movie_data.poster_url,
            year=movie_data.year,
            rating=movie_data.rating,
            genre=movie_data.genre.title(),
            age_rating=movie_data.age_rating,
            runtime=movie_data.runtime,
        )
        session.add(movie)
        session.commit()
    return True


@router.get("/movie/{movie_id}", response_model=MovieRead)
def get_movie_by_id(movie_id: int):
    with Session(engine) as session:
        movie = session.get(Movie, movie_id)
        if movie is None:
            raise HTTPException(status_code=404, detail="Movie not found")
        return MovieRead(
            id=movie_id,
            title=movie.title,
            description=movie.description,
            poster_url=movie.poster_url,
            year=movie.year,
            rating=movie.rating,
            genre=movie.genre,
            age_rating=movie.age_rating,
            runtime=movie.runtime,
            actors=[actor.name for actor in movie.actors],
            tags=[tag.name for tag in movie.tags],
        )


@router.delete("/movie/{movie_id}", response_model=Literal[True])
def delete_movie(movie_id: int, id: int, token: str):
    with Session(engine) as session:
        movie = session.get(Movie, movie_id)
        if movie is None:
            raise HTTPException(status_code=404, detail="Movie not found")
        admin = session.get(Admin, id)
        if admin is None:
            raise HTTPException(status_code=404, detail="Admin not found")
        if admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")
        session.delete(movie)
        session.commit()
    return True


@router.get("/all", response_model=List[MovieRead])
def get_all_movies() -> List[MovieRead]:
    with Session(engine) as session:
        movies = session.exec(select(Movie)).all()
        returned_movies = []
        for movie in movies:
            if movie.id is not None:
                returned_movies.append(
                    MovieRead(
                        id=movie.id,
                        title=movie.title,
                        description=movie.description,
                        poster_url=movie.poster_url,
                        year=movie.year,
                        rating=movie.rating,
                        genre=movie.genre,
                        age_rating=movie.age_rating,
                        runtime=movie.runtime,
                        actors=[actor.name for actor in movie.actors],
                        tags=[tag.name for tag in movie.tags],
                    )
                )
        return returned_movies
