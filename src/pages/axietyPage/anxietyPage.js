import Anxiety from "../../components/anxiety/anxiety";
import styles from "./anxietyPage.module.css";
export default function AnxietyPage({ participant, day, testDay }) {
  return (
    <>
      <div className={styles.confimPage}>
        <Anxiety day={day} testDay={testDay} participant={participant} />
      </div>
    </>
  );
}
