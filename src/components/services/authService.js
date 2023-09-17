import axios from "axios";
const apiEndpoint = "/.netlify/functions/userAuth";
const apiEndPointPatient = "/.netlify/functions/participantAuth";
const apiEndPointReminder = "/.netlify/functions/reminder";
const apiEndPointLoginExpired = "/.netlify/functions/updateIsLoginExpired";
export async function login(email, password) {
  const res = await axios.post(apiEndpoint, {
    email: email,
    password: password,
  });
  return res.data;
}

export async function participantLogin(participantId) {
  const res = await axios.post(apiEndPointPatient, {
    participantId: participantId,
  });
  return res.data;
}

export async function addReminder(participantId, reminderAt) {
  return await axios.put(apiEndPointReminder, {
    participantId: participantId,
    reminderAt: reminderAt,
  });
}

export async function updateIsLoginExpired(participantId, isLoginExpired) {
  return await axios.put(apiEndPointLoginExpired, {
    participantId: participantId,
    isLoginExpired: isLoginExpired,
  });
}
