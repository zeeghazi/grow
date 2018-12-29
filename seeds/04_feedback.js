const feedbacks = require("../seeds-data/feedbacks");
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("feedback")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("feedback").insert(feedbacks);
        });
};
