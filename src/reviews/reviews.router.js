const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .put(controller.updateReviewById)
    .delete(controller.destroyReviewById)
    .all(methodNotAllowed)



module.exports = router