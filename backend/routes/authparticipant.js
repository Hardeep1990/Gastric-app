const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
//file system
const fs = require("fs");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync("credentials.json"));

router.post("/", async (req, res) => {
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });
  // this loads the document properties
  await doc.loadInfo();

  try {
    const sheet = await doc.sheetsByTitle["participants"];
    const rows = await sheet.getRows();

    const { id } = req.body;
    const Participant = [];
    rows.map((row) => {
      Participant.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        cohort: row.cohort,
      });
    });
    const participant = await Participant.find((u) => u.id === id);
    if (!participant)
      return res
        .status(400)
        .send("Invalid participant code! Please contact the admin.");

    const token = jwt.sign(
      {
        id: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
      },
      config.get("jwtPrivateKey")
    );
    res.send(token);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
