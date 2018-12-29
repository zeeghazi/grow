const knex = require("./knex"); //knex connection

module.exports = {
    getAllFavourites() {
        return knex("favourite");
    },
    getOneFavourite(id) {
        return knex("favourite")
            .where("id", id)
            .first();
    },
    createFavourite(favourite) {
        return knex("favourite").insert(favourite, "*");
    },
    updateFavourite(id, favourite) {
        return knex("favourite")
            .where("id", id)
            .update(favourite, "*");
    },
    deleteFavourite(id) {
        return knex("favourite")
            .where("id", id)
            .del();
    }
};
