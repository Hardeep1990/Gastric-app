//need to require the npm module.
//https://www.npmjs.com/package/google-spreadsheet/v/3.3.0
const { GoogleSpreadsheet } = require("google-spreadsheet");

exports.handler = async function (event, context) {
  //uses the sheet based on sheet ID
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  //fields used on frontend. Key/values need to be parsed in order to be used or will return as undefined. If you assign the object to a variable on the frontend you will not need to parse on backend.
  const {
    participantId,
    upperStomach,
    nausea,
    bloating,
    heartburn,
    stomachBurn,
    excessivelyFull,
    fullEarly,
    vomitting,
    reflux,
    burping,
    rating,
    anxiety,
    depression,
    date,
    day,
  } = JSON.parse(event.body);

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

    const rows = await sheet.getRows();
    const participant = rows.find((r) => r.participantId === participantId);
    if (!participant) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Participant with ID ${participantId} doesn't exists!`,
        }),
      };
    }

    const symSheet = doc.sheetsByTitle["symptoms"];
    const symRows = await symSheet.getRows();
    let count = 0;
    if (symRows.length > 0) {
      count = symRows.length;
    }

    //appending rows on the sheet
    await symSheet.addRow({
      sn: count + 1,
      participantId: participantId,
      upperStomachPain: upperStomach,
      nausea: nausea,
      bloating: bloating,
      heartburn: heartburn,
      stomachBurn: stomachBurn,
      excessivelyFull: excessivelyFull,
      fullEarly: fullEarly,
      vomitting: vomitting,
      reflux: reflux,
      burping: burping,
      rating: rating,
      anxiety: anxiety,
      depression: depression,
      date: date,
      day: day,
    });

    return {
      statusCode: 200,
    };
  } catch (e) {
    return {
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};
