const favourites = require("../seeds-data/favourites");
exports.seed = function(knex, Promise) {
    return knex("favourite")
        .del()
        .then(function() {
            return knex("favourite").insert(favourites);
        });
};
