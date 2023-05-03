
const express = require("express");
const registrationInformation = require("../controllers/registrationInformation.controller");

const router = express.Router();

router.route("/")
    .get(registrationInformation.findAll)
    .post(registrationInformation.create);

router
    .route("/:id")
    .get(registrationInformation.findOne)
     .put(registrationInformation.update)
   // .put(registrationInformation.updateRegisInfo);
module.exports = router;
