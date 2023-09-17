//need to require the npm module.
//https://www.npmjs.com/package/google-spreadsheet/v/3.3.0
const { GoogleSpreadsheet } = require("google-spreadsheet");
const jwt = require("jsonwebtoken");
exports.handler = async function (event, context) {
  //uses the sheet based on sheet ID
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  const { email, password } = JSON.parse(event.body);

  if (!email) {
    throw new Error("missing email");
  }
  if (!password) {
    throw new Error("missing password");
  }

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      //regex used for escape
      private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
    });

    // loads doc properties and worksheets
    await doc.loadInfo();
    //index of the sheet being used (sheets are zero indexed)
    const sheet = await doc.sheetsByTitle["users"];

    //appending rows on the sheet
    const Users = [];
    const rows = await sheet.getRows();
    console.log("next to map method:");
    await rows.map((row) => {
      Users.push({
        _id: row._id,
        name: row.name,
        email: row.email,
        password: row.password,
        isAdmin: row.isAdmin,
      });
    });
    console.log("next to if/else:");
    const user = await Users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid email or password!", 400);
    }
    if (password !== user.password)
      throw new Error("Invalid email or password!", 400);
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_PRIVATE_KEY
    );
    console.log("next to retun:");
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
