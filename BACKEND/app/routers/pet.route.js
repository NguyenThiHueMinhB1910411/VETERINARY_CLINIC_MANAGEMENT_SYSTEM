const express = require("express");
const pet = require("../controllers/pet.controller");

const router = express.Router();

router
    .route("/")
    .get(pet.findAll);

module.exports = router;
   