import Cookies from "js-cookie";

export const setLoggedInParticipant = (participantId) => {
  Cookies.set("LoggedInParticipant", participantId);
};

export const getLoggedInParticipant = () => {
  return Cookies.get("LoggedInParticipant");
};
