import { useState } from "react";
import AddParticipant from "../../components/addParticipant/addParticipant";
import styles from "./addParticipantPage.module.css";

export default function AddPaticipantPage({ users }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={styles.addPaticipantPage}>
        <AddParticipant
          openModal={openModal}
          setOpenModal={setOpenModal}
          users={users}
        />
      </div>
    </>
  );
}
