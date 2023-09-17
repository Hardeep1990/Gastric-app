import React, { useState } from "react";
import BurpPM from "../EventModal/BurpPM";
import Burp from "../Images/Belch.png";
import styles from "./BurpCard.module.css";

function BurpCard(props) {
  const [openBurpModal, setOpenBurpModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  const showIcon = previousAnswer !== "0" || previousAnswer !== 0;

  return (
    <>
      <div
        className={styles.eventBurpCardSec}
        onClick={() => {
          setOpenBurpModal(true);
        }}
      >
        {showIcon && (
          <p className={styles.eventScore}>{`${[previousAnswer]}`}</p>
        )}
        <img src={Burp} className={styles.burpImg} alt="" />
        <h3 className={styles.erow1Text}>Burping</h3>
      </div>
      <BurpPM
        openBurpModal={openBurpModal}
        setOpenBurpModal={setOpenBurpModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default BurpCard;
