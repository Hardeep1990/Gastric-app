import styles from "./signinHero.module.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import smallLogo from "./assets/logo_small.png";

export default function SigninHero({ users }) {
  const [email, setEmail] = useState(users ? users.email : "");
  const [password, setPassword] = useState(users ? users.password : "");
  const [rememberMe, setRememberMe] = useState(true);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const storedEmail = Cookies.get("email");
    const storedPassword = Cookies.get("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  async function handleLogin() {
    console.log("I'm inside of the handle login");
    try {
      const { token } = await login(email, password);
      localStorage.setItem("jwtTokenAuth", token);
      console.log("I'm inside of the try block");
      setErr(false);

      if (rememberMe) {
        Cookies.set("email", email);
        Cookies.set("password", password);
      }

      navigate("/add-participant");
      window.location.reload();
    } catch (ex) {
      console.error("Invalid user email or password!", ex);
      setErr(true);
    }
  }
  function handleDisable() {
    return !(email && password);
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <section className={styles.logoContainer}>
          <div>
            <img src={smallLogo} alt="alimentry" />
          </div>
        </section>

        <section className={styles.loginContainer}>
          <div className={styles.loginInnerContainer}>
            <div className={styles.headingText}>Researcher Access</div>
            <div className={styles.subHeadingText}>
              Please sign in to add a participant
            </div>
            {err && (
              <div style={{ color: "red" }}>
                Invalid user email or password!.
              </div>
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              autoComplete="email"
              className={styles.inputEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="password"
              className={styles.inputPwd}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxInnerContainer}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                />
                <div className={styles.checkboxText}>Remember me</div>
              </div>
            </div>
            <button
              className={styles.signInBtn}
              type="button"
              onClick={handleLogin}
              disabled={handleDisable()}
            >
              Sign in
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
