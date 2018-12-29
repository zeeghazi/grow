exports.up = function(knex, Promise) {
    return knex.schema.createTable("user", table => {
        table.increments();
        table.text("fullname");
        table.text("username");
        table.text("email");
        table.text("address");
        table.text("number");
        table.text("type");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("user");
};
