const express = require("express");
const categoryPet = require("../controllers/categoryPet.controller");

const router = express.Router();

router
    .route("/")
    .get(categoryPet.findAll);

module.exports = router;
   