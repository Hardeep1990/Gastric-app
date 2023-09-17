import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import closeIcon from "./assets/X.png";
import checkMark from "./assets/CheckCircle.png";
import exclamationMark from "./assets/exclamationCircle.png";
import styles from "./contact.module.css";
export default function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailMatchError, setEmailMatchError] = useState(false);
  const [participantId, setParticipantId] = useState("");
  const [supportType, setsupportType] = useState("");
  const [message, setMessage] = useState("");

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const clearFormValues = () => {
    setName("");
    setFromEmail("");
    setConfirmEmail("");
    setParticipantId("");
    setsupportType("");
    setMessage("");
  };

  const contactForm = async () => {
    //Axios.post("http://localhost:4000/contact-us" replace the below endpoint if using NIHI's own hosted server.

    await axios
      .post("/.netlify/functions/sendgrid", {
        name: name,
        fromEmail: fromEmail,
        participantId: participantId,
        supportType: supportType,
        message: message,
      })
      .then((res) => {
        clearFormValues();
        console.log("good job!", res);
        setSuccessModal(true);
      })
      .catch((error) => {
        setErrorModal(true);
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <section className={styles.textArea}>
            <div>
              <h5 style={{ fontSize: "24px", fontWeight: "bold" }}>Hello!</h5>
            </div>
            <div>Get in contact. Report an issue or give your feedback.</div>
          </section>

          <form
            className={styles.formContainer}
            onSubmit={(e) => {
              contactForm();
              e.preventDefault();
            }}
          >
            <input
              value={name}
              type="text"
              className={styles.contactUsForm}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />

            <input
              value={fromEmail}
              type="email"
              className={styles.contactUsForm}
              placeholder="Email Address"
              onChange={(e) => {
                if (validator.isEmail(e.target.value)) {
                  console.log("valid email");
                } else {
                  console.log("invalid email address");
                }
                setFromEmail(e.target.value);
              }}
              required
            />
            <input
              value={confirmEmail}
              type="email"
              className={styles.contactUsForm}
              placeholder="Confirm Email Address"
              onChange={(e) => {
                if (validator.isEmail(e.target.value)) {
                  console.log("valid email");
                } else {
                  console.log("invalid email address");
                }
                setConfirmEmail(e.target.value);
                setEmailMatchError(e.target.value !== fromEmail);
              }}
              required
            />
            {emailMatchError && (
              <div className={styles.errorMessage}>
                Email addresses do not match!
              </div>
            )}
            <input
              value={participantId}
              type="text"
              className={styles.contactUsForm}
              placeholder="Participant ID (optional)"
              onChange={(e) => {
                setParticipantId(e.target.value);
              }}
            />
            <select
              defaultValue={supportType}
              type="text"
              className={styles.contactUsForm}
              onChange={(e) => {
                setsupportType(e.target.value);
              }}
              required
            >
              <option value="" disabled>
                Type of Support
              </option>
              <option>I can't login</option>
              <option>Report an issue with the app</option>
              <option>Feature request</option>
              <option>Other</option>
            </select>
            <textarea
              value={message}
              type="text"
              className={styles.textBox}
              placeholder="Message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
          <div
            className={styles.formContainer}
            style={{ marginBottom: "5rem" }}
          >
            <button
              id="backBtn"
              className={styles.backBtn}
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
          </div>
        </div>

        <section
          className={
            successModal ? styles.outterSuccessModal : styles.closeSuccessModal
          }
        >
          <div className={styles.innerSuccessModal}>
            <div className={styles.successCloseIconContainer}>
              <img
                className="close"
                src={closeIcon}
                alt="close icon"
                onClick={() => {
                  setSuccessModal(false);
                }}
              />
            </div>
            <div className={styles.successHeading}>
              <img src={checkMark} alt="check mark" />
              <h5
                style={{
                  fontFamily: "DM Sans",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Message sent!
              </h5>
            </div>
            <div className={styles.successBodyText}>
              <div>Thank you for getting in touch.</div>
              <div>
                One of our team members will get back in touch with you soon.
              </div>
            </div>
          </div>
        </section>

        <section
          className={
            errorModal ? styles.outterErrorModal : styles.closeErrorModal
          }
        >
          <div className={styles.innerErrorModal}>
            <div className={styles.errorCloseIconContainer}>
              <img
                src={closeIcon}
                alt="close icon"
                onClick={() => {
                  setErrorModal(false);
                }}
              />
            </div>
            <div className={styles.errorHeading}>
              <img src={exclamationMark} alt="exclamation mark" />
              <span>An error occured.</span>
            </div>
            <div className={styles.errorBodyText}>
              <div>There's been an error trying to send your message.</div>
              <div>
                Please try again later or send an email directly to:
                g.humphrey@auckland.ac.nz
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
