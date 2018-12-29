const knex = require("./knex"); //knex connection

module.exports = {
    getAllUsers() {
        return knex("user");
    },
    getOneUser(id) {
        return knex("user")
            .where("id", id)
            .first();
    },
    createUser(user) {
        return knex("user").insert(user, "*");
    },
    updateUser(id, user) {
        return knex("user")
            .where("id", id)
            .update(user, "*");
    },
    deleteUser(id) {
        return knex("user")
            .where("id", id)
            .del();
    }
};
