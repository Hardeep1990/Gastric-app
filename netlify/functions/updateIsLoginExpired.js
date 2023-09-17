//need to require the npm module.
//https://www.npmjs.com/package/google-spreadsheet/v/3.3.0
const { GoogleSpreadsheet } = require("google-spreadsheet");

exports.handler = async function (event, context) {
  //uses the sheet based on sheet ID
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  //fields used on frontend. Key/values need to be parsed in order to be used or will return as undefined. If you assign the object to a variable on the frontend you will not need to parse on backend.
  const { participantId, isLoginExpired } = JSON.parse(event.body);

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      //regex used for escape
      private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
    });

    // loads doc properties and worksheets
    await doc.loadInfo();

    //index of the sheet being used (sheets are zero indexed)
    const sheet = doc.sheetsByTitle["participants"];

    let setLoginExpired = false;
    //appending rows on the sheet
    if (isLoginExpired) {
      setLoginExpired = true;
    }
    const rows = await sheet.getRows();
    const participantRow = rows.find((r) => r.participantId === participantId);
    if (!participantRow) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Participant doesn't exist!",
        }),
      };
    }

    participantRow.isLoginExpired = setLoginExpired;
    await participantRow.save();

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};
