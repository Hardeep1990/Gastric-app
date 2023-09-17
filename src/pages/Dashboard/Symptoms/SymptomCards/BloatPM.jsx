import React from "react";
import { useState } from "react";
import { Slider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import handleAudioClick from "../../../../components/utilities/convertTextToAudio";
import Audioimg from "./Images/Audioimg.png";
import Bloat from "./Images/bloat.png";
import smile0 from "../../../../components/Sliderbar/images/Smile0.png";
import emoji2 from "../../../../components/Sliderbar/images/emoji2.png";
import emoji4 from "../../../../components/Sliderbar/images/emoji4.png";
import emoji6 from "../../../../components/Sliderbar/images/emoji6.png";
import emoji8 from "../../../../components/Sliderbar/images/emoji8.png";
import emoji10 from "../../../../components/Sliderbar/images/emoji10.png";
import styles from "./symtomCards.module.css";

function BloatPM(props) {
  const {
    openBloatModal,
    setOpenBloatModal,
    handleSave,
    previousAnswer,
    questionId,
  } = props;
  const [value, setValue] = useState(0, previousAnswer);

  const emojiArray = [
    { img: emoji10, key: "10" },
    { img: emoji8, key: "08" },
    { img: emoji6, key: "06" },
    { img: emoji4, key: "04" },
    { img: emoji2, key: "02" },
    { img: smile0, key: "00" },
  ];

  const valuesArray = [
    { num: "10", key: "10" },
    { num: "8", key: "08" },
    { num: "6", key: "06" },
    { num: "4", key: "04" },
    { num: "2", key: "02" },
    { num: "0", key: "00" },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!openBloatModal) return;
  const text =
    "Feeling like your stomach is uncomfortably stretched or visibly larger";
  return (
    <>
      <div className={styles.modalBckg}>
        <div className={styles.modalContainer}>
          <div className={styles.btnCloseSec}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setOpenBloatModal(false);
              }}
            >
              <CloseIcon className="close" />
            </button>
          </div>

          <div className={styles.symtMainTextSec}>
            <h4 className={styles.mainText1}>Bloating</h4>
          </div>

          {/* audio section */}
          <div className={styles.audioContainer}>
            <div className={styles.symtExplainSec}>
              <img
                src={Audioimg}
                className={styles.speakerImg}
                alt="Audio button"
                onClick={() => {
                  handleAudioClick(text);
                }}
              />
              <h6 className={styles.mainText2}>{text}</h6>
            </div>
          </div>

          {/* image + scroll bar section */}
          <div className={styles.imgPainSec}>
            <img src={Bloat} className={styles.imageStymp} alt="" />
            <div className={styles.imgContainer}>
              <div className={styles.mainEmojiContainer}>
                {emojiArray.map((array) => (
                  <div className={styles.emojiContainer} key={array.key}>
                    <img
                      className={styles.emojis}
                      src={array.img}
                      alt="smiley"
                      onClick={() => setValue(array.key)}
                    ></img>
                  </div>
                ))}
              </div>
              <div className={styles.slider}>
                <h6 className={styles.textSevere}>
                  Most severe <br /> imaginable
                </h6>
                <Slider
                  className={styles.vranger}
                  marks
                  min={0}
                  max={10}
                  step={2}
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                />
                <h6 className={styles.noneText}>None</h6>
              </div>
              <div className={styles.mainValueContainer}>
                {valuesArray.map((array) => (
                  <div className={styles.valueContainer} key={array.key}>
                    <div
                      className={styles.valuesArray}
                      src={array.num}
                      onClick={() => setValue(array.key)}
                    >
                      {array.num}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className={styles.footerBtns}>
            <button
              className={styles.okBtn}
              onClick={() => {
                setOpenBloatModal(false);
                handleSave({ [questionId]: value });
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BloatPM;
