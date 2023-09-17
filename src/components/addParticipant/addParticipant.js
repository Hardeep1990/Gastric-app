import axios from "axios";
import { useState } from "react";
import checkCircle from "./assets/CheckCircle.png";
import closeIcon from "./assets/X.png";
import styles from "./addPaticipant.module.css";
// import moment from "moment";
export default function AddParticipant({ openModal, setOpenModal, users }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [cohort, setCohort] = useState("");
  const [err, setErr] = useState("");
  const [testDate, setTestDate] = useState("");
  const [startDate, setStartDate] = useState("");
  // const [numberOfTests, setNumberOfTests] = useState("");

  const addRow = () => {
    // if (startDate !== "" && testDate !== "") {
    //   const startDt = moment(startDate, "YYYY-MM-DD");
    //   const testDt = moment(testDate, "YYYY-MM-DD");
    //   setNumberOfTests(testDt.diff(startDt, "days"));
    // }
    //Axios.post("http://localhost:4000/add-participant" replace the below endpoint if using NIHI's own hosted server.
    return axios.post("/.netlify/functions/addParticipant", {
      firstName: firstName,
      lastName: lastName,
      participantId: participantId,
      dob: dob,
      mobile: mobile,
      email: email,
      cohort: cohort,
      testDate: testDate,
      startDate: startDate,
      // numberOfTests: numberOfTests,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    addRow()
      .then((res) => {
        console.log(res);
        setFirstName("");
        setLastName("");
        setParticipantId("");
        setDob("");
        setEmail("");
        setMobile("");
        setTestDate("");
        setStartDate("");
        setOpenModal(true);
      })
      .catch((err) => {
        setOpenModal(false);
        setErr(err.response.data.message);
      });
  };

  return (
    <>
      <div className={styles.bodyContainer}>
        {users && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Welcome!</strong> {users.name}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <div className={styles.addParticipantText}>Add Participant</div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <section className={styles.formInnerContainer}>
              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>First Name</label>
                <input
                  value={firstName}
                  className={styles.inputFields}
                  placeholder="First Name"
                  type="text"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Last Name</label>
                <input
                  value={lastName}
                  className={styles.inputFields}
                  placeholder="Last Name"
                  type="text"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Pt ID</label>

                <input
                  value={participantId}
                  className={styles.inputFields}
                  placeholder="E.g. AK-PED-001"
                  type="text"
                  required
                  onChange={(e) => {
                    setParticipantId(e.target.value);
                  }}
                />
              </div>

              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Date of Birth</label>
                <input
                  value={dob}
                  className={styles.inputFields}
                  type="date"
                  required
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>
              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Mobile</label>
                <input
                  value={mobile}
                  className={styles.inputFields}
                  type="number"
                  placeholder="eg..022-527-6078"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Email</label>
                <input
                  value={email}
                  className={styles.inputFields}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Confirm Email</label>
                <input
                  className={styles.inputFields}
                  type="email"
                  placeholder="Confirm Email"
                  onChange={(e) => {
                    setErr(
                      e.target.value !== email
                        ? " Email and Confirm Email do not match."
                        : ""
                    );
                  }}
                />
              </div>

              <div className={styles.inputContainers}>
                <label className={styles.labelFields} placeholder="">
                  Study cohort
                </label>
                <select
                  defaultValue={cohort}
                  className={styles.selectDropdown}
                  type="text"
                  required
                  onChange={(e) => {
                    setCohort(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    -- select --
                  </option>
                  <option>Case</option>
                  <option>Control</option>
                  <option>Other</option>
                </select>
              </div>

              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Diary Start Date</label>
                <input
                  value={startDate}
                  className={styles.inputFields}
                  type="date"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className={styles.inputContainers}>
                <label className={styles.labelFields}>Test Date</label>
                <input
                  value={testDate}
                  className={styles.inputFields}
                  type="date"
                  onChange={(e) => {
                    setTestDate(e.target.value);
                  }}
                />
              </div>

              {err && (
                <div className={styles.inputContainers}>
                  <div
                    style={{
                      color: "red",
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {err}
                  </div>
                </div>
              )}
            </section>

            <button type="submit" className={styles.addBtn}>
              Add
            </button>
          </form>
        </div>
      </div>
      {/*  */}
      <div
        className={openModal ? styles.openModal : styles.closedModal}
        onClick={() => {
          setOpenModal(false);
        }}
      >
        <div className={styles.modalInnerContainer}>
          <div className={styles.iconContainer}>
            <img
              src={closeIcon}
              alt="close icon"
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
          <div>
            <img src={checkCircle} alt="check circle" />
          </div>
          <section className={styles.textBox}>
            <div>User Successfully Added</div>
            <div>The participant has been added to the study.</div>
          </section>
        </div>
      </div>
    </>
  );
}
