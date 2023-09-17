import { useEffect } from "react";
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("jwtTokenAuth");
    window.location = "/signin";
  }, []);
  return null;
};

export default Logout;
