const express = require("express");
const infoService = require("../controllers/infoService.controller");

const router = express.Router();

router
    .route("/")
    .get(infoService.findAll);

module.exports = router;
   