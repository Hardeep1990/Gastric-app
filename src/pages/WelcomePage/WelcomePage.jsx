import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import DashboardMain from "../Dashboard/Symptoms/DashboardSympt";
import styles from "./WelcomePage.module.css";
function WelcomePage({ participant }) {
  const parti = { ...participant };
  const name = parti.firstName;

  const navigate = useNavigate();
  const navigateToSymptDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <div className={styles.textSec}>
        <div className={styles.text1}>
          <h3 className={styles.welcomeTextSec}>
            <b>Hi, {name}</b>
          </h3>
        </div>
        <div className={styles.text2}>
          <h3 className={styles.feelingTextSec}>
            <b>
              {" "}
              Ready to record any stomach <br />
              symptoms you had <br /> today?
            </b>
          </h3>
        </div>
      </div>

      {/* <div className={styles.imgSec}>
        <img src={WelBadge} alt="" className={styles.imgMonster} />
      </div> */}

      {/* Navigate to symptoms dashboard */}
      <div className={styles.startBtn}>
        <button onClick={navigateToSymptDashboard} className={styles.btnStart}>
          Start
        </button>

        <Routes>
          <Route path="/dashboard" element={<DashboardMain />} />
        </Routes>
      </div>
    </div>
  );
}

export default WelcomePage;
