const users = require("../seeds-data/users");
exports.seed = function(knex, Promise) {
    return knex("user")
        .del()
        .then(function() {
            return knex("user").insert(users);
        });
};
