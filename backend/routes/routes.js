const express = require("express");
const router = express.Router();

const { contactForm } = require("../controllers/sendgrid.controller");
const { addRow, getRows } = require("../controllers/googleSheets.controller");

router.post("/contact-us", contactForm);
router.post("/add-participant", addRow);
router.get("/add-participant", getRows);

module.exports = { router };
