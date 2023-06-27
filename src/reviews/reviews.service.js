const knex = require("../db/connection");

async function destroyReviewById(reviewId) {
  const deletedReview = await knex("reviews")
    .where("review_id", reviewId)
    .del();

  return deletedReview; // Return the number of deleted rows
}

async function updateReviewById(review) {
    await knex("reviews").where("review_id", review.review_id).update(review)

    const updatedReview = await knex("reviews")
        .where("review_id", review.review_id)
        .first()

        return updatedReview
}

function read(review_id) {
  return knex("reviews as r")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select(
    "r.*",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as c_created_at",
      "c.updated_at as c_updated_at"
  )
  .where({ review_id })
  .first()
  
} 

module.exports = {
  destroyReviewById,
  updateReviewById,
  read,
};
