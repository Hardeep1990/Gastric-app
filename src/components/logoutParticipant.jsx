import { useEffect } from "react";
import Cookies from "js-cookie";
const LogoutParticipant = () => {
  useEffect(() => {
    localStorage.removeItem("jwtTokenParticipant");
    Cookies.remove("questions");
    Cookies.remove("rating");
    Cookies.remove("anxiety");
    Cookies.remove("depression");
    window.location = "/";
  }, []);
  return null;
};

export default LogoutParticipant;
