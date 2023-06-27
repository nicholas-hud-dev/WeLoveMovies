exports.up = function(knex) {
    return knex("movies_theaters")
      .where({ movie_id: 1 })
      .update({ is_showing: false });
  };
  
  exports.down = function(knex) {
    // Revert the update if needed
    return knex("movies_theaters")
      .where({ movie_id: 1 })
      .update({ is_showing: true });
  };
  