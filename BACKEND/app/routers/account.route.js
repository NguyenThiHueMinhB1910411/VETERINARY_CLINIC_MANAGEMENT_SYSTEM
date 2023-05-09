const express = require("express");
const account = require("../controllers/account.controller");

const router = express.Router();

router.route("/")
.post(account.login)
.get(account.findAll)

router.route("/create")
    .post(account.create)


router.route("/register")
    .post(account.register);

router
    .route("/:id")
    .post(account.update)
    .get(account.findOne)
    .delete(account.delete);

module.exports = router; 