import React, { useState } from "react";
import BloatPM from "../SymptomCards/BloatPM";
import Bloating from "../SymptomCards/Images/bloat.png";
import styles from "./BloatCard.module.css";

const images = {
  99: "/images/Smile0.png",
  2: "/images/emoji2.png",
  4: "/images/emoji4.png",
  6: "/images/emoji6.png",
  8: "/images/emoji8.png",
  10: "images/emoji10.png",
};
function BloatCard(props) {
  const [openBloatModal, setOpenBloatModal] = useState(false);
  const { previousAnswer, handleSave, questionId } = props;
  //const showIcon = previousAnswer !== "0" || previousAnswer !== 0;

  return (
    <>
      <div
        className={styles.card3}
        onClick={() => {
          setOpenBloatModal(true);
        }}
      >
        {/* {showIcon && ( */}
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
        {/* )} */}
        <img src={Bloating} className={styles.Bloating} alt="" />
        <h3 className={styles.row1Text}>Bloating</h3>
      </div>
      <BloatPM
        setOpenBloatModal={setOpenBloatModal}
        openBloatModal={openBloatModal}
        handleSave={handleSave}
        questionId={questionId}
      />
    </>
  );
}

export default BloatCard;
