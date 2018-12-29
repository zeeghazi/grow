const knex = require("./knex"); //knex connection

module.exports = {
    getAllServices() {
        return knex("service");
    },
    getOneService(id) {
        return knex("service")
            .where("id", id)
            .first();
    },
    createService(service) {
        return knex("service").insert(service, "*");
    },
    updateService(id, service) {
        return knex("service")
            .where("id", id)
            .update(service, "*");
    },
    deleteService(id) {
        return knex("service")
            .where("id", id)
            .del();
    }
};
