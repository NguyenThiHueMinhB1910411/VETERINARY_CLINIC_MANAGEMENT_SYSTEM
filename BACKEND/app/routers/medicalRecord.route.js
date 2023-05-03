const express = require("express");
const medicalRecord = require("../controllers/medicalRecord.controller");

const router = express.Router();

router
    .route("/getAll/info")
    .get(medicalRecord.getAllInfo)
router
    .route("/")
    .get(medicalRecord.findAll)
    .post(medicalRecord.create);
router
    .route("/:id")
    .get(medicalRecord.findOne);


  
    

module.exports = router;
   