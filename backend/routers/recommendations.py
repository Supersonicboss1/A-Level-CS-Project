"""
Recommendations Algorithm:
1. Get the user's liked movies (user.liked_movies) DONE
2. Get the tags of the user's liked movies (movie.tags)
3. Get the actors of the user's liked movies (movie.actors)
4. Get the genres of the user's liked movies (movie.genre)
5. Calculate a score for each tag, actor, and genre based on how many times they appear in the user's liked movies
6. Get the movies that have the highest score for tags, actors, and genres
"""
from typing import List

from fastapi import APIRouter, HTTPException
from main.db import engine
from main.schemas.movies import AgeRatings, Movie, MovieWithScore
from main.schemas.user import User
from sqlmodel import Session, select

router = APIRouter()


def get_tag_scores(liked_movies: List[Movie]) -> dict[str, int]:
    tag_scores = {}
    for movie in liked_movies:
        for tag in movie.tags:
            if (
                tag.name in tag_scores
            ):  # error here -> tag is not hashable -> fixed by using tag.name - same for all tags and actors
                tag_scores[tag.name] += 1
            else:
                tag_scores[tag.name] = 1
    return tag_scores


def get_actor_scores(liked_movies: List[Movie]) -> dict[str, int]:
    actor_scores = {}
    for movie in liked_movies:
        for actor in movie.actors:
            if actor.name in actor_scores:
                actor_scores[actor.name] += 1
            else:
                actor_scores[actor.name] = 1
    return actor_scores


def get_genre_scores(liked_movies: List[Movie]) -> dict[str, int]:
    genre_scores = {}
    for movie in liked_movies:
        genre = movie.genre
        if genre in genre_scores:
            genre_scores[genre] += 1
        else:
            genre_scores[genre] = 1
    return genre_scores


@router.get("/{user_id}", response_model=list[Movie])
def get_recommendations(user_id: int, token: str, genre: str, age_rating: AgeRatings, min_runtime: int):
    with Session(engine) as session:
        info = session.get(User, user_id)
        if info is None or info.token != token:  # for security
            raise HTTPException(status_code=404, detail="User not found")
        liked_movies = info.liked_movies
        tag_scores = get_tag_scores(liked_movies)
        actor_scores = get_actor_scores(liked_movies)
        genre_scores = get_genre_scores(liked_movies)
        # get list of all movies
        movies = session.exec(select(Movie).where(Movie.genre == genre.title()).where(Movie.age_rating == age_rating).where(Movie.runtime <= min_runtime)).all()
        movies_scored = []
        for movie in movies:
            if movie.id is not None:
                movies_scored.append(
                    MovieWithScore(
                        id=movie.id,
                        title=movie.title,
                        description=movie.description,
                        poster_url=movie.poster_url,
                        year=movie.year,
                        rating=movie.rating,
                        genre=movie.genre,
                        runtime=movie.runtime,
                        age_rating=movie.age_rating,
                        actors=[actor.name for actor in movie.actors],
                        tags=[tag.name for tag in movie.tags],
                        score=0,
                    )
                )
        for movie in movies_scored:
            for tag in movie.tags:
                if tag in tag_scores:
                    movie.score += tag_scores[tag]
            for actor in movie.actors:
                if actor in actor_scores:
                    movie.score += actor_scores[actor]
            if movie.genre in genre_scores:
                movie.score += genre_scores[movie.genre] * 2
        # sort movies by score
        movies_scored.sort(key=lambda x: x.score, reverse=True)
        # return the top 5
        return movies_scored[:5]
