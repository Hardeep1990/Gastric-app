import { useNavigate } from "react-router-dom";
import tickImg from "./assets/tickImg.png";
import styles from "./successPageBody.module.css";

const SuccessPageBody = ({ day }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.tickImg}>
            <img src={tickImg} alt="tick img" />
          </div>
          <div className={styles.textBox}>
            <div>
              <h3>
                <b>Day {day} done </b>
              </h3>
            </div>
            <div>
              <h5>
                <b>See you tomorrow </b>
              </h5>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonFinish}
            style={{ backgroundColor: "var(--secondary-blue)" }}
            onClick={() => {
              navigate("/logoutParticipant");
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
};
export default SuccessPageBody;
