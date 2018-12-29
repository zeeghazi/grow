exports.up = function(knex, Promise) {
    return knex.schema.createTable("feedback", table => {
        table.increments();
        table.text("review");
        table.float("rating");
        table.integer("user_id");
        table.integer("service_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("feedback");
};
