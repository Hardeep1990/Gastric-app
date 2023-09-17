import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import handleAudioClick from "../../../../components/utilities/convertTextToAudio";
import Audioimg from "../../Symptoms/SymptomCards/Images/Audioimg.png";
import VmtImage from "../Images/Vomit.png";
import styles from "./eventModal.module.css";
function VmtPM(props) {
  const { openVmtModal, setOpenVmtModal, handleSave, questionId } = props;

  let [count, setCount] = useState(0);
  const text = "Throwing up food or liquid";
  let increaseValue = () => {
    setCount((count += 1));
  };

  let decreaseValue = () => {
    count > 0 ? setCount((count -= 1)) : setCount(0);
  };

  if (!openVmtModal) return null;
  return (
    <>
      <div className={styles.modalBckg}>
        <div className={styles.modalContainer}>
          <div className={styles.btnCloseSec}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setOpenVmtModal(false);
              }}
            >
              <CloseIcon className="close" />
            </button>
          </div>

          <div className={styles.symtMainTextSec}>
            <h4 className={styles.mainText1}>Vomiting</h4>
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

          {/* image section */}
          <div className={styles.imgPainSec}>
            <img src={VmtImage} className={styles.imageStymp} alt="" />
          </div>

          <div className={styles.questionSec}>
            <h4 className={styles.equestionText}>How many times today?</h4>
          </div>

          {/* Counter Section */}
          <div className={styles.counterBtnSec}>
            <div className={styles.decSec}>
              <button
                onClick={decreaseValue}
                value={count}
                onChange={(e) => setCount(e.currentTarget.alue)}
                className={styles.decreaseBtn}
              >
                <RemoveIcon />
              </button>
            </div>

            <div className={styles.textSec}>
              <h4 type="text" className={styles.displayBtn}>
                {count}
              </h4>
            </div>

            <div className={styles.incSec}>
              <button
                onClick={increaseValue}
                value={count}
                onChange={(e) => setCount(e.currentTarget.alue)}
                className={styles.increaseBtn}
              >
                <AddIcon />
              </button>
            </div>
          </div>

          {/* Buttons Section + OnSubmit*/}
          <div className={styles.footerBtns}>
            <button
              className={styles.okBtn}
              onClick={() => {
                setOpenVmtModal(false);
                handleSave({ [questionId]: count });
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

export default VmtPM;
