import Completion from "../../components/completionPage/completion";
import styles from "./completionPage.module.css";

export default function CompletionPage({ day }) {
  return (
    <>
      <div className={styles.completionPage}>
        <Completion day={day} />
      </div>
    </>
  );
}
