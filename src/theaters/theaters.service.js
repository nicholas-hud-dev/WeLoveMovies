const knex = require("../db/connection");

async function list() {
    const theaters = await knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select(
          "t.*",
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at as m_created_at",
      "m.updated_at as m_updated_at",
      "mt.is_showing",
      "mt.theater_id as mt_theater_id"
    )
    
    return theaters
}

module.exports = {
    list,
}