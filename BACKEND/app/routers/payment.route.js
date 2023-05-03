const express = require("express");
const payment = require("../controllers/payment.controller");

const router = express.Router();

router
    .route("/")
    .get(payment.findAll)
    .post(payment.create);
module.exports = router;
   