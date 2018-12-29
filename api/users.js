const express = require("express");
const router = express.Router();

const userQueries = require("../db/userQueries");

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    const err = new Error("Invalid ID");
    err.status = 400;
    next(err);
}

function validUser(req, res, next) {
    const user = req.body;
    const hasFullName =
        typeof user.fullname == "string" && user.fullname.trim() != "";
    const hasUserName =
        typeof user.username == "string" && user.username.trim() != "";
    const hasEmail = typeof user.email == "string" && user.email.trim() != "";
    const hasNumber =
        typeof user.number == "string" && user.number.trim() != "";
    if (hasFullName && hasUserName && hasEmail && hasNumber) {
        return next();
    } else {
        const err = new Error("Invalid User");
        err.status = 400;
        next(err);
    }
}

router.get("/", (req, res) => {
    userQueries.getAllUsers().then(users => {
        res.json(users);
    });
});

router.get("/:id", isValidId, (req, res, next) => {
    userQueries.getOneUser(req.params.id).then(user => {
        if (user) res.json(user);
        else next();
    });
});

router.post("/", validUser, (req, res, next) => {
    userQueries.createUser(req.body).then(user => {
        res.json(user[0]);
    });
});

router.put("/:id", isValidId, validUser, (req, res, next) => {
    userQueries.updateUser(req.params.id, req.body).then(user => {
        res.json(user[0]);
    });
});

router.delete("/:id", isValidId, (req, res, next) => {
    userQueries.deleteUser(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;
