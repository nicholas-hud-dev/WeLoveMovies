const reviewsService = require("./reviews.service");
const db = require("../db/connection")

async function destroyReviewById(req, res, next) {
  try {
    const { reviewId } = req.params;
    const deletedRowCount = await reviewsService.destroyReviewById(reviewId);

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "" });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

async function updateReviewById(req, res, next) {
  try {
    const { reviewId } = req.params;
    const updatedReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: reviewId,
    };

    // Check if the review exists before updating
    const reviewExists = await reviewsService.read(reviewId);
    if (!reviewExists) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    const review = await reviewsService.updateReviewById(updatedReview);

    // Fetch the critic information
    const critic = await db("critics")
      .where({ critic_id: review.critic_id })
      .first();

    const updatedReviewWithCritic = {
      ...review,
      critic: {
        preferred_name: critic.preferred_name,
        surname: critic.surname,
        organization_name: critic.organization_name,
      },
    };

    res.json({ data: updatedReviewWithCritic });
  } catch (error) {
    next(error);
  }
}


async function reviewExists(req, res, next) {
  try {
    const review = await reviewsService.read(req.params.reviewId)
    if (!review) {
      return res.status(404).json({ error: "Review cannot be found"})
    } else {
      next()
    }
   
  } catch (error) {
    next(error)
  }
}

module.exports = {
  updateReviewById: [reviewExists, updateReviewById],
  destroyReviewById,
};
