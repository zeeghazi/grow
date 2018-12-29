const express = require("express");
const router = express.Router();

const feedbackQueries = require("../db/feedbackQueries");

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    const err = new Error("Invalid ID");
    err.status = 400;
    next(err);
}

function validFeedback(req, res, next) {
    const feedback = req.body;
    const hasReview =
        typeof feedback.review == "string" && feedback.review.trim() != "";
    const hasRating = !isNaN(feedback.rating);
    const hasUserId = !isNaN(feedback.user_id);
    const hasServiceId = !isNaN(feedback.service_id);
    if (hasReview && hasRating && hasUserId && hasServiceId) {
        return next();
    } else {
        const err = new Error("Invalid Feedback");
        err.status = 400;
        next(err);
    }
}

router.get("/", (req, res) => {
    feedbackQueries.getAllFeedbacks().then(feedbacks => {
        res.json(feedbacks);
    });
});

router.get("/:id", isValidId, (req, res, next) => {
    feedbackQueries.getOneFeedback(req.params.id).then(feedback => {
        if (feedback) res.json(feedback);
        else next();
    });
});

router.post("/", validFeedback, (req, res, next) => {
    feedbackQueries.createFeedback(req.body).then(feedback => {
        res.json(feedback[0]);
    });
});

router.put("/:id", isValidId, validFeedback, (req, res, next) => {
    feedbackQueries.updateFeedback(req.params.id, req.body).then(feedback => {
        res.json(feedback[0]);
    });
});

router.delete("/:id", isValidId, (req, res, next) => {
    feedbackQueries.deleteFeedback(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;
