import React, { useState } from "react";
import NauseaPM from "../SymptomCards/NauseaPM";
import Nausea from "../SymptomCards/Images/Nausea.png";
import styles from "./NauseaCard.module.css";

const images = {
  0: "/images/Smile0.png",
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function NauseaCard(props) {
  const [openNauseaModal, setOpenNauseaModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  return (
    <>
      <div
        className={styles.card2}
        onClick={() => {
          setOpenNauseaModal(true);
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

        <img src={Nausea} className={styles.Nausea} alt="" />
        <h3 className={styles.row1Text}>Nausea</h3>
      </div>
      <NauseaPM
        openNauseaModal={openNauseaModal}
        setOpenNauseaModal={setOpenNauseaModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default NauseaCard;
