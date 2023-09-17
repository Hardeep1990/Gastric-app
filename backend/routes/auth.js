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
    const sheet = await doc.sheetsByTitle["users"];
    const rows = await sheet.getRows();

    const { email, password } = req.body;
    const User = [];
    rows.map((row) => {
      User.push({
        _id: row._id,
        name: row.name,
        email: row.email,
        password: row.password,
        isAdmin: row.isAdmin,
      });
    });
    const user = await User.find((u) => u.email === email);
    if (!user) return res.status(400).send("Invalid email or password!");

    if (password !== user.password)
      return res.status(400).send("Invalid email or password!");

    const token = jwt.sign(
      { _id: user._id, name: user.name, isAdmin: user.isAdmin },
      config.get("jwtPrivateKey")
    );
    res.send(token);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
