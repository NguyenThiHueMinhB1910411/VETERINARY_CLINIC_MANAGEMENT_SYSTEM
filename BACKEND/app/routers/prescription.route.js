const express = require("express");
const prescription = require("../controllers/prescription.controller");

const router = express.Router();

router
    .route("/")
    .get(prescription.findAll)
    .post(prescription.create);

router
    .route("/:id")
    .get(prescription.findOne)
    .post(prescription.update);   
    

module.exports = router;
   