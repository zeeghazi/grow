const express = require("express");
const router = express.Router();

const serviceQueries = require("../db/serviceQueries");

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    const err = new Error("Invalid ID");
    err.status = 400;
    next(err);
}

function validService(req, res, next) {
    const service = req.body;
    const hasName =
        typeof service.name == "string" && service.name.trim() != "";
    const hasOwnerId =
        typeof service.owner_id == "number" && Number(service.owner_id) >= 0;
    if (hasName && hasOwnerId) {
        return next();
    } else {
        const err = new Error("Invalid Service");
        err.status = 400;
        next(err);
    }
}

router.get("/", (req, res) => {
    serviceQueries.getAllServices().then(services => {
        res.json(services);
    });
});

router.get("/:id", isValidId, (req, res, next) => {
    serviceQueries.getOneService(req.params.id).then(service => {
        if (service) res.json(service);
        else next();
    });
});

router.post("/", validService, (req, res, next) => {
    serviceQueries.createService(req.body).then(service => {
        res.json(service[0]);
    });
});

router.put("/:id", isValidId, validService, (req, res, next) => {
    serviceQueries.updateService(req.params.id, req.body).then(service => {
        res.json(service[0]);
    });
});

router.delete("/:id", isValidId, (req, res, next) => {
    serviceQueries.deleteService(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;
