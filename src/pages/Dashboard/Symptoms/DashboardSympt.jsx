import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import StomachPM from "./SymptomCards/StomachPM";
import NauseaPM from "./SymptomCards/NauseaPM";
import BloatPM from "./SymptomCards/BloatPM";
import ExcessivelyFPM from "./SymptomCards/ExcessivelyFPM";
import HeartburnPM from "./SymptomCards/HeartburnPM";
import StomachburnPM from "./SymptomCards/StomachburnPM";
import EarlySatietyPM from "./SymptomCards/EarlySatietyPM";
import VmtPM from "../Events/EventModal/VmtPM";
import RefluxPM from "../Events/EventModal/RefluxPM";
import BurpPM from "../Events/EventModal/BurpPM";
import BloatCard from "./Cards/BloatCard";
import StomachPCard from "./Cards/StomachPCard";
import NauseaCard from "./Cards/NauseaCard";
import HeartburnCard from "./Cards/HeartburnCard";
import StomachburnCard from "./Cards/StomachburnCard";
import ExfullCard from "./Cards/ExfullCard";
import EarlyfullCard from "./Cards/EarlyfullCard";
import VmtCard from "../Events/EventCard/VmtCard";
import RefluxCard from "../Events/EventCard/RefluxCard";
import BurpCard from "../Events/EventCard/BurpCard";
import ConfirmRatingBody from "../../../components/confirmRating/confirmRating";
import styles from "./DashboardSympt.module.css";

function DashboardMain({ participant }) {
  const [questions, setQuestions] = useState({
    sympt1: 99,
    sympt2: 99,
    sympt3: 99,
    sympt4: 99,
    sympt5: 99,
    sympt6: 99,
    sympt7: 99,
    sympt8: 0,
    sympt9: 0,
    sympt10: 0,
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const qList = Cookies.get("questions");
    if (qList) {
      setQuestions(JSON.parse(qList));
    }
  }, []);
  const handleModal = (answer) => {
    try {
      const newQuestions = { ...questions, ...answer };
      console.log("participantId", participant.participantId);
      console.log("handleSave", answer);
      console.log("newQuestions", newQuestions);

      setQuestions(newQuestions);
      Cookies.set("questions", JSON.stringify(newQuestions));

      setSelectedQuestionId(null);
    } catch (error) {
      console.log("error in try catch: ", error);
    }
  };

  // const navigateToConfirmPage = () => {
  //   const encodedQuestions = encodeURIComponent(JSON.stringify(questions));
  //   navigate(`/confirm?questions=${encodedQuestions}`);
  // };
  const navigateToConfirmPage = () => {
    //const encodedQuestions = encodeURIComponent(JSON.stringify(questions));
    navigate("/anxiety");
  };

  return (
    <>
      <div className={styles.mainDashBoard}>
        <div className={styles.mainTextDiv}>
          <h4 className={styles.dashMainTextSec}>
            Tap the symptoms you have had today
          </h4>
        </div>

        <div className={styles.symptRowSec}>
          {/* Stomach Pain Section */}
          <div>
            <StomachPCard
              key={"sympt1"}
              type="button"
              questionId={"sympt1"}
              previousAnswer={questions["sympt1"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt1");
              }}
            />
            <StomachPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Nausea Section */}
          <div>
            <NauseaCard
              key={"sympt2"}
              type="button"
              questionId={"sympt2"}
              previousAnswer={questions["sympt2"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt2");
              }}
            />
            <NauseaPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>
          {/* Bloat Section */}
          <div>
            <BloatCard
              key={"sympt3"}
              type="button"
              questionId={"sympt3"}
              previousAnswer={questions["sympt3"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt3");
                console.log("BloatPm: sympt");
              }}
            />
            <BloatPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Heartburn Section */}
          <div>
            <HeartburnCard
              key={"sympt4"}
              type="button"
              questionId={"sympt4"}
              previousAnswer={questions["sympt4"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt4");
              }}
            />
            <HeartburnPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Stomach Burn Section */}
          <div>
            <StomachburnCard
              key={"sympt5"}
              type="button"
              questionId={"sympt5"}
              previousAnswer={questions["sympt5"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt5");
              }}
            />
            <StomachburnPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Excessively Full Section */}
          <div>
            <ExfullCard
              key={"sympt6"}
              type="button"
              questionId={"sympt6"}
              previousAnswer={questions["sympt6"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt6");
              }}
            />
            <ExcessivelyFPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Early Full Section */}
          <div>
            <EarlyfullCard
              key={"sympt7"}
              type="button"
              questionId={"sympt7"}
              previousAnswer={questions["sympt7"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt7");
              }}
            />
            <EarlySatietyPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className={styles.eventsRowSec}>
        <h4 className={styles.eventMainText}>What events happened today:</h4>
        <div className={styles.eventsCardsSec}>
          {/* Vmt Section */}
          <div>
            <VmtCard
              key={"sympt8"}
              type="button"
              questionId={"sympt8"}
              previousAnswer={questions["sympt8"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt8");
              }}
            />
            <VmtPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Reflux Section */}
          <div>
            <RefluxCard
              key={"sympt9"}
              type="button"
              questionId={"sympt9"}
              previousAnswer={questions["sympt9"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt9");
              }}
            />

            <RefluxPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>

          {/* Burp Section */}
          <div>
            <BurpCard
              key={"sympt10"}
              type="button"
              questionId={"sympt10"}
              previousAnswer={questions["sympt10"]}
              handleSave={handleModal}
              handleClick={() => {
                setSelectedQuestionId("sympt10");
              }}
            />
            <BurpPM
              key={"modal" + selectedQuestionId}
              show={selectedQuestionId}
              questionId={selectedQuestionId}
              previousAnswer={questions[selectedQuestionId]}
              handleSave={handleModal}
            />
          </div>
        </div>

        {/* Navigate to success page  */}
        <div className={styles.buttonContainer}>
          <div> </div>
          <div>
            {" "}
            <button
              className={styles.buttonFinish}
              style={{ backgroundColor: "var(--secondary-blue)" }}
              onClick={navigateToConfirmPage}
            >
              Next
            </button>
          </div>
          <Routes>
            <Route path="/confirm" element={<ConfirmRatingBody />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardMain;
