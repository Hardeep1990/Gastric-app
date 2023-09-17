import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoLarge from "../hero/assets/logo_large.png";
import closeIcon from "./assets/X.png";
import styles from "../hero/homeLoginHero.module.css";
import { participantLogin } from "../../services/authService";
import jwtDecode from "jwt-decode";
import {
  getLoggedInParticipant,
  setLoggedInParticipant,
} from "../../utilities/cookies";

export default function HomePageHero({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [participantId, setParticipantId] = useState("");
  const [tempParticipant, setTempParticipant] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [err, setErr] = useState("");
  const loggedInUser = getLoggedInParticipant(participantId);
  function handleDisabled() {
    return !participantId;
  }

  useEffect(() => {
    const storedParticipantId = getLoggedInParticipant();
    if (storedParticipantId) {
      setParticipantId(storedParticipantId);
    }
  }, []);
  function handleParticipantId(e) {
    e.preventDefault();
    setParticipantId(e.target.value);
  }
  async function handleSignInButton() {
    try {
      const { token } = await participantLogin(participantId);
      localStorage.setItem("jwtTokenParticipant", token);

      const jwtToken = localStorage.getItem("jwtTokenParticipant");
      if (!jwtToken) {
        setTempParticipant(null);
        return;
      }
      setTempParticipant(null);
      if (jwtToken) {
        const token = jwtDecode(jwtToken);
        setTempParticipant(token);
        setErr(false);
        if (rememberMe) {
          setLoggedInParticipant(participantId);
        }

        // if (participant) {
        //   if (participant.isLoginExpired === "TRUE")
        //     return window.alert("Your login session has expired!");
        // }

        return setOpenModal(true);
      }
    } catch (error) {
      setErr(true);
    }
  }
  function handleYesBtn() {
    try {
      const token = localStorage.getItem("jwtTokenParticipant");
      const rem = jwtDecode(token);
      if (rem) {
        if (rem.isReminderSet === "TRUE") {
          window.location = "/welcome-page/*";
        } else {
          window.location = "/reminder";
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      setLoggedInParticipant(participantId);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <section className={styles.heroContainer}>
          <div>
            <img
              src={logoLarge}
              alt="alimentry logo"
              className={styles.logoLarge}
            />
          </div>
        </section>

        <div className={styles.outterContainer}>
          <div className={styles.innerContainer}>
            <section className={styles.loginContainer}>
              <div className={styles.loginText}>
                <h4 className={styles.loginTextHeader}>Symptom Diary</h4>
                <div className={styles.loginSubHeader}>
                  Please sign in using the code sent to you.
                </div>
              </div>
              {loggedInUser && (
                <input
                  onChange={(e) => handleParticipantId(e)}
                  type="text"
                  value={participantId}
                  className={styles.inputField}
                />
              )}
              {!loggedInUser && (
                <input
                  onChange={(e) => handleParticipantId(e)}
                  type="text"
                  value={participantId}
                  placeholder="e.g ABC12345"
                  className={styles.inputField}
                />
              )}
              {err && (
                <div style={{ color: "red" }}>
                  Invalid code! Please check your code and try again.
                </div>
              )}
            </section>

            <section className={styles.checkboxContainer}>
              <div className={styles.checkboxInnerContainer}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  className={styles.checkbox}
                />
                <div className={styles.checkboxText}>Remember me</div>
              </div>
            </section>

            <section>
              <button
                className={styles.signInButton}
                onClick={handleSignInButton}
                disabled={handleDisabled()}
              >
                Sign in
              </button>
            </section>

            <section className={styles.contact}>
              <span
                onClick={() => {
                  navigate("/contact-us");
                }}
              >
                Having trouble signing in?
              </span>
            </section>
          </div>
        </div>

        <section
          className={openModal ? styles.openModal : styles.closedModal}
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <div className={styles.modalInnerContainer}>
            <div className={styles.upperModal}>
              <div className={styles.iconContainer}>
                <img
                  className="close"
                  src={closeIcon}
                  alt="close icon"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                />
              </div>
              <div>Is this you?</div>
            </div>
            <div className={styles.lowerModal}>
              <div className={styles.InnerLowerModal}>
                <div className={styles.nameBox}>
                  {tempParticipant && (
                    <>
                      <div>First Name: {tempParticipant.firstName}</div>
                      <div>Last Name: {tempParticipant.lastName}</div>
                    </>
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.yesBtn} onClick={handleYesBtn}>
                    Yes
                  </button>
                  <button
                    className={styles.noBtn}
                    onClick={() => {
                      localStorage.removeItem("jwtTokenParticipant");
                      window.location = "/";
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
