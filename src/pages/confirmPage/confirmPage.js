import ConfirmRatingBody from "../../components/confirmRating/confirmRating";
import styles from "./confirmPage.module.css";

export default function ConfirmPage({ participant, day, testDay }) {
  return (
    <>
      <div className={styles.confimPage}>
        <ConfirmRatingBody
          day={day}
          testDay={testDay}
          participant={participant}
        />
      </div>
    </>
  );
}
