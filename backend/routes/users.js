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
  //title of the sheet being used
  const sheet = await doc.sheetsByTitle["users"];
  const rows = await sheet.getRows();

  let id = "6448a9821e67e002789dc6ec";
  const { name, email, password } = req.body;
  const userExist = (await rows).find((r) => r.email === email);
  if (userExist) return res.status(400).send("User already exist!");

  try {
    if (!name) {
      return res.status(400).send("missing name");
    }

    if (!email) {
      return res.status(400).send("missing email");
    }
    if (!password) {
      return res.status(400).send("missing password");
    }

    const newRow = await sheet.addRow({
      _id: id + `nihig${email}`,
      name: name,
      email: email,
      password: password,
      isAdmin: false,
    });
    const user = {
      _id: newRow._id,
      name: newRow.name,
      isAdmin: newRow.isAdmin,
    };
    const token = jwt.sign(user, config.get("jwtPrivateKey"));
    res
      .header("x-header-token", token)
      .header("access-control-expose-headers", "x-header-token")
      .send(user);
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
    const sheet = doc.sheetsByTitle["users"];

    const rows = await sheet.getRows();
    console.log(rows); // get all the rows in the sheet
    const datas = [];

    rows.map((row) => {
      datas.push({
        _id: row._id,
        name: row.name,
        email: row.email,
      });
    });
    let user = datas.find((user) => user._id === req.user._id);
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
