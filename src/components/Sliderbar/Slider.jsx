import React, { useState } from "react";
import smile0 from "./images/Smile0.png";
import emoji2 from "./images/emoji2.png";
import emoji4 from "./images/emoji4.png";
import emoji6 from "./images/emoji6.png";
import emoji8 from "./images/emoji8.png";
import emoji10 from "./images/emoji10.png";
import styles from "./Sliderbar.module.css";

function Slider() {
  const [value, setValue] = useState(0);

  return (
    <>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <input
            className={styles.vranger}
            max={10}
            min={0}
            step={2}
            type="range"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>

        <div className={styles.emoji}>
          <div className={styles.emoji10}>
            <img className={styles.smile0Img} src={emoji10} alt="Smiley Face" />
          </div>

          <div className={styles.emoji8}>
            <img className={styles.smile0Img} src={emoji8} alt="Smiley Face" />
          </div>

          <div className={styles.emoji6}>
            <img className={styles.smile0Img} src={emoji6} alt="Smiley Face" />
          </div>

          <div className={styles.emoji4}>
            <img className={styles.smile0Img} src={emoji4} alt="Smiley Face" />
          </div>

          <div className={styles.emoji2}>
            <img className={styles.smile0Img} src={emoji2} alt="Smiley Face" />
          </div>

          <div className={styles.smile0}>
            <img className={styles.smile0Img} src={smile0} alt="Smiley Face" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
