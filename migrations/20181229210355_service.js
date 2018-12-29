exports.up = function(knex, Promise) {
    return knex.schema.createTable("service", table => {
        table.increments();
        table.text("name");
        table.integer("owner_id");
        table.text("availability_time_start");
        table.text("availability_time_end");
        table.float("rate");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("service");
};
