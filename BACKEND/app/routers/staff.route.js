const express = require("express");
const staff = require("../controllers/staff.controller");

const router = express.Router();


router
    .route("/")
    .get(staff.findAll)
    .post(staff.create);

    router
    .route("/:id")
    .put(staff.update)
    .get(staff.findOne)
    .delete(staff.delete);

module.exports = router;
   