const express = require("express");
const doctor = require("../controllers/doctor.controller");

const router = express.Router();

router
    .route("/")
    .get(doctor.findAll)
    .post(doctor.create);

    router
    .route("/:id")
    .post(doctor.update)
    .get(doctor.findOne)
    .delete(doctor.delete);

module.exports = router;
   