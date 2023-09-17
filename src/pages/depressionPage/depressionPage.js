import styles from "./depressionPage.module.css";
import Depression from "../../components/Depression/depression";

export default function DepressionPage({ participant, day, testDay }) {
  return (
    <>
      <div className={styles.confimPage}>
        <Depression day={day} testDay={testDay} participant={participant} />
      </div>
    </>
  );
}
