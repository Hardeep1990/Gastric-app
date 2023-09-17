import SuccessPageBody from "../../components/successPage/successPageBody";
import styles from "./successPage.module.css";

export default function SuccessPage({ day }) {
  return (
    <>
      <div className={styles.successPage}>
        <SuccessPageBody day={day} />
      </div>
    </>
  );
}
