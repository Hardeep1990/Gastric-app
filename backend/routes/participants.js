const { GoogleSpreadsheet } = require("google-spreadsheet");
const config = require("config");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const express = require("express");
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

  //sheet name of the sheet tab being used
  const sheet = await doc.sheetsByTitle["participants"];
  const rows = await sheet.getRows();

  const { id, firstName, lastName, dob, email, cohort } = req.body;

  const userExist = (await rows).find((r) => r.email === email || r.id === id);
  if (userExist) return res.status(400).send("User already exist!");

  try {
    if (!id) {
      return res.status(400).send("missing id");
    }
    if (!firstName) {
      return res.status(400).send("missing firstName");
    }

    if (!lastName) {
      return res.status(400).send("missing lastName");
    }
    if (!dob) {
      return res.status(400).send("missing dob");
    }
    if (!email) {
      return res.status(400).send("missing email");
    }
    if (!cohort) {
      return res.status(400).send("missing cohort");
    }

    const newRow = await sheet.addRow({
      id: id,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      cohort: cohort,
    });
    const particpant = {
      id: newRow.id,
      firstName: newRow.firstName,
      lastName: newRow.lastName,
    };
    const token = jwt.sign(particpant, config.get("jwtPrivateKey"));
    res
      .header("x-header-token", token)
      .header("access-control-expose-headers", "x-header-token")
      .send(particpant);
  } catch (error) {
    res.send(error);
  }
});
router.get("/me", auth, async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CREDENTIALS.client_email,
      private_key: CREDENTIALS.private_key,
    });

    // this loads the document properties
    await doc.loadInfo();

    //index of the sheet being used
    const sheet = doc.sheetsByTitle["participants"];

    const rows = await sheet.getRows();
    const datas = [];

    rows.map((row) => {
      datas.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        dob: row.dob,
        email: row.email,
        cohort: row.cohort,
      });
    });
    const participant = datas.find(
      (participant) => participant.id === req.user.id
    );
    if (!participant) return res.status(404).send("Participant not found.");

    res.send(participant);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
