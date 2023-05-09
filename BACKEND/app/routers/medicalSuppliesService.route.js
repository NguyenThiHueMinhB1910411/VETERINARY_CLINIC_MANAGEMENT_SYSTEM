const express = require("express");
const medicalSupplies = require("../controllers/medicalSupplies.controller");

const router = express.Router();

router
    .route("/")
    .get(medicalSupplies.findAll)
    .post(medicalSupplies.create);
router
    .route("/:id")
    .delete(medicalSupplies.delete);
    //.get(medicalSupplies.findOne)

router
    .route("/findMedical")
    .post(medicalSupplies.findOne)
module.exports = router;
   