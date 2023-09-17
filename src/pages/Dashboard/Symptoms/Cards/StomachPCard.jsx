import React, { useState } from "react";
import StomachPM from "../SymptomCards/StomachPM";
import GutPain from "../Images/Upper Gut Pain.png";
import styles from "./StomachPCard.module.css";

const images = {
  0: "/images/Smile0.png",
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function StomachPCard(props) {
  const [openSPain, setOpenSPain] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  return (
    <>
      <div
        className={styles.cardSec}
        onClick={() => {
          setOpenSPain(true);
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

        <img src={GutPain} className={styles.gutPain} alt="" />
        <h3 className={styles.row1Text}>Upper Stomach Pain</h3>
      </div>
      <StomachPM
        openSPain={openSPain}
        setOpenSPain={setOpenSPain}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default StomachPCard;
