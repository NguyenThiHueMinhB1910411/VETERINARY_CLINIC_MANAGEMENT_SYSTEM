
const express = require("express");
const ApiError = require("./app/api-error");
const fileUpload = require('express-fileupload');


const cors = require("cors");
const app = express();
app.use(express.json());
app.use(fileUpload());

const accountRouter = require("./app/routers/account.route");
const doctorRouter = require("./app/routers/doctor.route");
const staffRouter = require("./app/routers/staff.route");
const categoryPetRouter = require("./app/routers/categoryPet.route");
const categoryServiceRouter = require("./app/routers/categoryService.route");
const petRouter = require("./app/routers/pet.route");
const serviceRouter = require("./app/routers/service.route");
const feedbackRouter = require("./app/routers/feedback.route");
const customerRouter = require("./app/routers/customer.route");
const registrationInformationServiceRouter = require("./app/routers/registrationInformation.route");

const medicalSuppliesRouter = require("./app/routers/medicalSuppliesService.route");
const PrescriptionRouter = require("./app/routers/prescription.route");
const MedicalRecordRouter = require("./app/routers/medicalRecord.route");
const PaymentRouter = require("./app/routers/payment.route");



app.use(cors());
app.use("/api/account", accountRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/staff",staffRouter);
app.use("/api/categoryPet",categoryPetRouter);
app.use("/api/categoryService",categoryServiceRouter);
app.use("/api/pet",petRouter);
app.use("/api/service", serviceRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/customer", customerRouter);
app.use("/api/registrationInformation", registrationInformationServiceRouter);
app.use("/api/medicalSupplies", medicalSuppliesRouter);
app.use("/api/prescription", PrescriptionRouter);
app.use("/api/medicalRecord", MedicalRecordRouter);
app.use("/api/payment", PaymentRouter);



//define error

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// app.use((req, res, next) => {
//   return next(new ApiError(404, "Resource not found"));
// });

module.exports = app;
