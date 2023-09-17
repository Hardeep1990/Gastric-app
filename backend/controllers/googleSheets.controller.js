const { GoogleSpreadsheet } = require("google-spreadsheet");

//file system
const fs = require("fs");
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync("credentials.json"));

const addRow = async (req, res) => {
  const { firstName, lastName, id, dob, email, cohort } = req.body;

  if (!firstName) {
    return res.status(400).send("missing first name");
  }
  if (!lastName) {
    return res.status(400).send("missing last name");
  }
  if (!id) {
    return res.status(400).send("missing participant id");
  }
  if (!dob) {
    return res.status(400).send("missing date of birth");
  }
  if (!email) {
    return res.status(400).send("missing email");
  }
  if (!cohort) {
    return res.status(400).send("missing cohort");
  }

  try {
    await doc.useServiceAccountAuth({
      client_email: CREDENTIALS.client_email,
      private_key: CREDENTIALS.private_key,
    });

    // this loads the document properties
    await doc.loadInfo();

    //index of the sheet being used
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      firstName: firstName,
      lastName: lastName,
      id: id,
      dob: dob,
      email: email,
      cohort: cohort,
    });
  } catch (error) {
    res.send(error);
  }
};

const getRows = async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CREDENTIALS.client_email,
      private_key: CREDENTIALS.private_key,
    });

    // this loads the document properties
    await doc.loadInfo();

    //index of the sheet being used
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    res.send("retreive");
    console.log(rows); // get all the rows in the sheet
    const datas = [];
    rows.map((row) => {
      datas.push(row._rawData);
    }); // return the data as an array of objects
    console.log(datas);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addRow,
  getRows,
};
