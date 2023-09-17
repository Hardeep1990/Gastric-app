import React, { useState } from "react";
import VmtPM from "../EventModal/VmtPM";
import VomitImage from "../Images/Vomit.png";
import styles from "./VmtCard.module.css";

function VmtCard(props) {
  const [openVmtModal, setOpenVmtModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  const showIcon = previousAnswer !== "0" || previousAnswer !== 0;

  return (
    <>
      <div
        className={styles.eventCardSec}
        onClick={() => {
          setOpenVmtModal(true);
        }}
      >
        {showIcon && (
          <p className={styles.eventScore}>{`${[previousAnswer]}`}</p>
        )}
        <img src={VomitImage} className={styles.vmtImg} alt="" />
        <h3 className={styles.erow1Text}>Vomiting</h3>
      </div>
      <VmtPM
        setOpenVmtModal={setOpenVmtModal}
        openVmtModal={openVmtModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default VmtCard;
