import React, { useState } from "react";
import ExcessivelyFPM from "../SymptomCards/ExcessivelyFPM";
import Full from "../SymptomCards/Images/Full.png";
import styles from "./ExfullCard.module.css";

const images = {
  0: "/images/Smile0.png",
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function ExfullCard(props) {
  const [openExFullModal, setOpenExFullModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  // const showIcon = previousAnswer !== "0" || previousAnswer !== 0;
  return (
    <>
      <div
        className={styles.card6}
        onClick={() => {
          setOpenExFullModal(true);
        }}
      >
        <p className={styles.emojiRating}>
          <img
            className={styles.showEmoji}
            alt=""
            style={{
              opacity: previousAnswer === 99 ? 0 : "",
              transition: "opacity 0.3s",
            }}
            src={`${images[previousAnswer]}`}
          />
        </p>

        <img src={Full} className={styles.eFull} alt="" />
        <h3 className={styles.row1Text}>Excessively Full</h3>
      </div>
      <ExcessivelyFPM
        openExFullModal={openExFullModal}
        setOpenExFullModal={setOpenExFullModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default ExfullCard;
