const { GoogleSpreadsheet } = require("google-spreadsheet");
const jwt = require("jsonwebtoken");
exports.handler = async function (event, context) {
  //uses the sheet based on sheet ID
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  const { participantId } = JSON.parse(event.body);

  if (!participantId) {
    throw new Error("missing participant Id!");
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
    const sheet = await doc.sheetsByTitle["participants"];

    //appending rows on the sheet
    const Participants = [];
    const rows = await sheet.getRows();
    await rows.map((row) => {
      Participants.push({
        firstName: row.firstName,
        lastName: row.lastName,
        participantId: row.participantId,
        dob: row.dob,
        email: row.email,
        cohort: row.cohort,
        isReminderSet: row.isReminderSet,
        startDate: row.startDate,
        testDate: row.testDate,
        isLoginExpired: row.isLoginExpired,
      });
    });

    const participant = await Participants.find(
      (p) => p.participantId === participantId
    );
    if (!participant) {
      throw new Error("Invalid participant Id!", 400);
    }

    if (participant.isLoginExpired === "TRUE") {
      throw new Error("You login session has been expired.", 400);
    }
    const token = jwt.sign(
      {
        participantId: participant.participantId,
        firstName: participant.firstName,
        lastName: participant.lastName,
        isReminderSet: participant.isReminderSet,
        startDate: participant.startDate,
        testDate: participant.testDate,
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
