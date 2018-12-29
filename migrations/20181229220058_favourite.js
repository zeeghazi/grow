exports.up = function(knex, Promise) {
    return knex.schema.createTable("favourite", table => {
        table.increments();
        table.integer("service_id");
        table.integer("user_id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("favourite");
};
