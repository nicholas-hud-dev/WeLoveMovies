exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", function(table) {
      table.integer("movie_id").unsigned().references("movies.movie_id");
      table.integer("theater_id").unsigned().references("theaters.theater_id");
      table.boolean("is_showing");
      table.timestamps(true, true);
      table.primary(["movie_id", "theater_id"]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("movies_theaters");
  };
  

