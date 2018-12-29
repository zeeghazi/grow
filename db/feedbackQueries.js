const knex = require("./knex"); //knex connection

module.exports = {
    getAllFeedbacks() {
        return knex("feedback");
    },
    getOneFeedback(id) {
        return knex("feedback")
            .where("id", id)
            .first();
    },
    createFeedback(feedback) {
        return knex("feedback").insert(feedback, "*");
    },
    updateFeedback(id, feedback) {
        return knex("feedback")
            .where("id", id)
            .update(feedback, "*");
    },
    deleteFeedback(id) {
        return knex("feedback")
            .where("id", id)
            .del();
    }
};
