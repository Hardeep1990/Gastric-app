import React, { useState } from "react";
import EarlySatietyPM from "../SymptomCards/EarlySatietyPM";
import Satiety from "../SymptomCards/Images/ESatiety.png";
import styles from "./EarlyfullCard.module.css";

const images = {
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function EarlyfullCard(props) {
  const { previousAnswer, handleSave, questionId } = props;
  //const showIcon = previousAnswer !== "0" || previousAnswer !== 0;
  const [openESatietyModal, setOpenESatietyModal] = useState(false);

  return (
    <>
      <div
        className={styles.card7}
        onClick={() => {
          setOpenESatietyModal(true);
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
        <img src={Satiety} className={styles.eSatiety} alt="" />
        <h3 className={styles.row1Text}>Full Early</h3>
      </div>
      <EarlySatietyPM
        openESatietyModal={openESatietyModal}
        setOpenESatietyModal={setOpenESatietyModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default EarlyfullCard;
