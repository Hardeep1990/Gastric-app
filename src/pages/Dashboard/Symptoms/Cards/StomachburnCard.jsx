import React, { useState } from "react";
import StomachBurn from "../SymptomCards/Images/stomachburn.png";
import styles from "./StomachburnCard.module.css";
import StomachburnPM from "../SymptomCards/StomachburnPM";

const images = {
  0: "/images/Smile0.png",
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function StomachburnCard(props) {
  const [openStomachburnModal, setOpenStomachburnModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  return (
    <>
      <div
        className={styles.card5}
        onClick={() => {
          setOpenStomachburnModal(true);
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

        <img src={StomachBurn} className={styles.stomachBurn} alt="" />
        <h3 className={styles.row1Text}>Stomach Burn</h3>
      </div>
      <StomachburnPM
        setOpenStomachburnModal={setOpenStomachburnModal}
        openStomachburnModal={openStomachburnModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default StomachburnCard;
