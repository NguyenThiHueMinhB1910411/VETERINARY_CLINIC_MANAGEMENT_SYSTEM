const express = require("express");
const customer = require("../controllers/customer.controller");

const router = express.Router();

router
    .route("/")
    .get(customer.findAll);
    // .post(customer.create);

module.exports = router;
   