const MoviesService = require("./movies.service")

async function getAllMovies(req, res, next) {
    try {
      if (req.query.is_showing === "true") {
                const movies = await MoviesService.getShowingMovies()
        res.json({ data: movies })
      }
        const movies = await MoviesService.getAllMovies()
        res.json({ data: movies })
    } catch(error) {
        next(error)
    }
}


async function getMovieById(req, res, next) {
    try {
        const { movieId } = req.params
        const movie = await MoviesService.getMovieById(movieId)

        if (!movie) {
            return res.status(404).json({ error: "Movie cannot be found."})
        }
        res.json({ data: movie })
    } catch (error) {
        next(error)
    }
}

async function getTheatersByMovieId(req, res, next) {
    try {
        const { movieId } = req.params
        const theaters = await MoviesService.getTheatersByMovieId(movieId)

        res.json({ data: theaters })
    } catch (error) {
        next(error)
    }
}

async function getReviewsByMovieId(req, res, next) {
    try {
        const { movieId } = req.params
        const reviews = await MoviesService.getReviewsByMovieId(movieId)

        res.json({ data: reviews })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    getTheatersByMovieId,
    getReviewsByMovieId,
}