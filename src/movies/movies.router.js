const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.getAllMovies)
    .all(methodNotAllowed)

router
    .route("/:movieId")
    .get(controller.getMovieById)
    .all(methodNotAllowed)

router  
    .route("/:movieId/theaters")
    .get(controller.getTheatersByMovieId)
    .all(methodNotAllowed)

router
    .route("/:movieId/reviews")
    .get(controller.getReviewsByMovieId)
    .all(methodNotAllowed)

module.exports = router