exports.up = function(knex) {
    return knex.schema.createTable("reviews", function(table) {
      table.increments("review_id").primary();
      table.text("content");
      table.integer("score");
      table.integer("critic_id").unsigned().references("critics.critic_id");
      table.integer("movie_id").unsigned().references("movies.movie_id");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
  };
  