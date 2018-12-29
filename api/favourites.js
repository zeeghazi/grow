const express = require("express");
const router = express.Router();

const favouriteQueries = require("../db/favouriteQueries");

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    const err = new Error("Invalid ID");
    err.status = 400;
    next(err);
}

function validFavourite(req, res, next) {
    const favourite = req.body;
    const hasUserId = !isNaN(favourite.user_id);
    const hasServiceId = !isNaN(favourite.service_id);
    if ((hasUserId, hasServiceId)) {
        return next();
    } else {
        const err = new Error("Invalid Favourite");
        err.status = 400;
        next(err);
    }
}

router.get("/", (req, res) => {
    favouriteQueries.getAllFavourites().then(favourites => {
        res.json(favourites);
    });
});

router.get("/:id", isValidId, (req, res, next) => {
    favouriteQueries.getOneFavourite(req.params.id).then(favourite => {
        if (favourite) res.json(favourite);
        else next();
    });
});

router.post("/", validFavourite, (req, res, next) => {
    favouriteQueries.createFavourite(req.body).then(favourite => {
        res.json(favourite[0]);
    });
});

router.put("/:id", isValidId, validFavourite, (req, res, next) => {
    favouriteQueries
        .updateFavourite(req.params.id, req.body)
        .then(favourite => {
            res.json(favourite[0]);
        });
});

router.delete("/:id", isValidId, (req, res, next) => {
    favouriteQueries.deleteFavourite(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;
