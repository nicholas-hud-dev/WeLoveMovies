const theatersService = require("./theaters.service");
const moviesService = require("../movies/movies.service")
const reduceProperties = require("../utils/reduce-properties")

const list = async (req, res) => {
    const theaters = await theatersService.list()
    const moviesTheaters = await moviesService.listMoviesWithTheaters()

    const reduceTheatersMovies = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        is_showing: ["movies", null, "is_showing"],
    })

    const theatersWithMovies = reduceTheatersMovies([...theaters, ...moviesTheaters])

    res.json({ data: theatersWithMovies })
}

module.exports = {
    list,
}