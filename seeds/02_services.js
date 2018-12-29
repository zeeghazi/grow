const services = require("../seeds-data/services");
exports.seed = function(knex, Promise) {
    return knex("service")
        .del()
        .then(function() {
            return knex("service").insert(services);
        });
};
