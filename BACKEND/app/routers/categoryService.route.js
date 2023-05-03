const express = require("express");
const categoryService = require("../controllers/categoryService.controller");

const router = express.Router();

router
    .route("/")
    .get(categoryService.findAll);

    router
    .route("/:id")
    .get(categoryService.findOne)

module.exports = router;
   