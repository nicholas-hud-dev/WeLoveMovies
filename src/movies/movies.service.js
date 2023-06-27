const knex = require("../db/connection")

function getAllMovies() {
    return knex("movies").select("*")
}

function getShowingMovies() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where("movies_theaters.is_showing", true)
    .groupBy("movies.movie_id")
    .select("movies.*")
}



function getMovieById(movieId) {
    return knex("movies").where("movie_id", movieId).first()
}

function getTheatersByMovieId(movieId) {
    return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "=", "movies_theaters.theater_id")
    .where("movies_theaters.movie_id", movieId)
    .select("*")
}

async function getReviewsByMovieId(movieId) {
    const reviews = await knex("reviews")
      .where("movie_id", movieId)
      .join("critics", "reviews.critic_id", "=", "critics.critic_id")
      .select("reviews.*", "critics.*" )
      .then((rows) => {
      return rows.map((row) => ({
        ...row,
        critic: {
          organization_name: row.organization_name,
          preferred_name: row.preferred_name,
          surname: row.surname
        }
      }));
    });
    return reviews;
  }

  async function listMoviesWithTheaters() {
    const movies = await knex("movies").select("*");
    const theaters = await knex("theaters").select("*");
  
    const moviesWithTheaters = theaters.map((theater) => {
      const moviesShowing = movies.filter((movie) =>
        movie.theater_id === theater.theater_id
      );
      return { ...theater, movies: moviesShowing };
    });
  
    return moviesWithTheaters;
  }
  

module.exports = {
    getAllMovies,
    getShowingMovies,
    getMovieById,
    getTheatersByMovieId,
    getReviewsByMovieId,
    listMoviesWithTheaters,
}