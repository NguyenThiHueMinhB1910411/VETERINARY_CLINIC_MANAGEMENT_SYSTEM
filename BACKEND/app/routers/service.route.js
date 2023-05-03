const express = require("express");
const service = require("../controllers/service.controller");

const router = express.Router();

router
    .route("/")
    .get(service.findAll)
    .post(service.create);

    router
    .route("/:id")
    .get(service.findOne)
router.route("/getByName")
    .post(service.findByName)
module.exports = router;
   