const { GoogleSpreadsheet } = require("google-spreadsheet");
exports.handler = async function (event, context) {
  //uses the sheet based on sheet ID
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  //fields used on frontend. Key/values need to be parsed in order to be used or will return as undefined. If you assign the object to a variable on the frontend you will not need to parse on backend.
  const {
    firstName,
    lastName,
    participantId,
    dob,
    mobile,
    email,
    cohort,
    testDate,
    startDate,
    // numberOfTests,
  } = JSON.parse(event.body);

  if (!firstName) {
    throw new Error("missing first name");
  }
  if (!lastName) {
    throw new Error("missing last name");
  }
  if (!participantId) {
    throw new Error("missing participant id");
  }
  if (!dob) {
    throw new Error("missing date of birth");
  }

  if (!cohort) {
    throw new Error("missing cohort");
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
    const sheet = doc.sheetsByTitle["participants"];
    const rows = await sheet.getRows();

    const participant = rows.find((r) => r.participantId === participantId);
    if (participant) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Participant with ID ${participantId} already exists!`,
        }),
      };
    }

    const reminderAt = null;
    let count = 0;
    if (rows.length > 0) {
      count = rows.length;
    }
    //appending rows on the sheet
    await sheet.addRow({
      sn: count + 1,
      firstName: firstName,
      lastName: lastName,
      participantId: participantId,
      dob: dob,
      mobile: mobile,
      email: email,
      cohort: cohort,
      startDate: startDate,
      testDate: testDate,
      // numberOfTests: numberOfTests,
      reminderAt: reminderAt,
      isReminderSet: false,
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
