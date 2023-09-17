import React, { useState } from "react";
import HeartburnPM from "../SymptomCards/HeartburnPM";
import Heartburn from "../SymptomCards/Images/heartburn.png";
import styles from "./HeartburnCard.module.css";

const images = {
  0: "/images/Smile0.png",
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function HeartburnCard(props) {
  const [openHBModal, setOpenHBModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  return (
    <>
      <div
        className={styles.card4}
        onClick={() => {
          setOpenHBModal(true);
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

        <img src={Heartburn} className={styles.heartBurn} alt="" />
        <h3 className={styles.row1Text}>Heartburn</h3>
      </div>
      <HeartburnPM
        setOpenHBModal={setOpenHBModal}
        openHBModal={openHBModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default HeartburnCard;
