const express = require("express");
const feedback = require("../controllers/feedback.controller");

const router = express.Router();

router
    .route("/")
    .get(feedback.findAll)
    .post(feedback.create);

    
router
    .route("/:id")
    .put(feedback.update)
    .get(feedback.findOne)
    .delete(feedback.delete);

   
module.exports = router;
   