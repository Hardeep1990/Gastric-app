import { useNavigate } from "react-router-dom";
import tickImg from "./assets/tickImg.png";
import styles from "./completion.module.css";
const Completion = ({ day }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.tickImg1}>
            <img src={tickImg} alt="tick img" />
          </div>
          <div className={styles.upperTextBox}>
            <div>
              Congratulations <br />
              that is <br />
              Day {day} done
            </div>
          </div>
          <div className={styles.lowerTextBox}>
            <div>Preparing for your test tomorrow:</div>
            <ul>
              <li>No food or water the night before</li>
              <li>Stop the medicines as discussed</li>
              <li>Wear comfy clothes</li>
            </ul>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              navigate("/logoutParticipant");
            }}
          >
            log out
          </button>
        </div>
      </div>
    </>
  );
};
export default Completion;
