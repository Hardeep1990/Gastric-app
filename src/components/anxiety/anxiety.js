import { Slider } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import emoji00 from "./assets/emojis/emoji00.png";
import emoji02 from "./assets/emojis/emoji02.png";
import emoji04 from "./assets/emojis/emoji04.png";
import emoji06 from "./assets/emojis/emoji06.png";
import emoji08 from "./assets/emojis/emoji08.png";
import emoji10 from "./assets/emojis/emoji10.png";
import "./muiSlider.css";
import styles from "./anxiety.module.css";

export default function Anxiety({ participant, day, testDay }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(parseInt(0, 10));
  const [scaleBeenTouched, setScaleBeenTouched] = useState(true);
  const emojiArray = [
    { img: emoji00, key: "10" },
    { img: emoji02, key: "08" },
    { img: emoji04, key: "06" },
    { img: emoji06, key: "04" },
    { img: emoji08, key: "02" },
    { img: emoji10, key: "00" },
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
    setScaleBeenTouched(false);
    if (typeof newValue === "number") {
      setValue(newValue);
    } else if (Array.isArray(newValue)) {
      setValue(parseInt(newValue[0], 10)); // Parse to integer
    }
  };
  useEffect(() => {
    const ratingValue = Cookies.get("anxiety");
    if (ratingValue) {
      setValue(ratingValue);
    }
  }, []);
  const handleFinish = () => {
    Cookies.set("anxiety", value);
    return navigate("/depression");
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.innerMainContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.textContainer}>
              <div>
                <h5 style={{ fontSize: "24px", fontWeight: "bold" }}>
                  Today, I felt?
                </h5>
              </div>
            </div>
            <div className={styles.sliderTextTop}>Not Worried</div>

            <div className={styles.sliderContainer}>
              <div className={styles.mainEmojiContainer}>
                {emojiArray.map((array) => (
                  <div className={styles.emojiContainer} key={array.key}>
                    <img
                      className={styles.emojis}
                      src={array.img}
                      alt="smiley"
                      onClick={() => {
                        setValue(array.key);
                      }}
                      active={() => {
                        console.log(true);
                        return true;
                      }}
                    />
                    <span>-</span>
                  </div>
                ))}
              </div>
              <div className={styles.innerSliderContainer}>
                <Slider
                  step={2}
                  marks
                  min={0}
                  max={10}
                  orientation="vertical"
                  value={value}
                  focusVisible
                  onChange={handleChange}
                />
              </div>
              <div className={styles.mainValueContainer}>
                {valuesArray.map((array) => (
                  <div className={styles.valueContainer} key={array.key}>
                    <span>-</span>
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
            <div className={styles.sliderTextBot}>Worried</div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div>
            {" "}
            <button
              className={styles.buttonFinish}
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
          </div>
          <div>
            {" "}
            <button
              className={styles.buttonFinish}
              onClick={handleFinish}
              disabled={scaleBeenTouched}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
