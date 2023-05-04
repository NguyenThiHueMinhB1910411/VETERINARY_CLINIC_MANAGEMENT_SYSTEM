const express = require("express");
const feedback = require("../controllers/feedback.controller");

const router = express.Router();

router
    .route("/")
    .get(feedback.findAll)
    .post(feedback.create);

   
module.exports = router;
   