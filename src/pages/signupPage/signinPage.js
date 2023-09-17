import SigninHero from "../../components/signin/signupHero";
import styles from "./signupPage.module.css";

export default function SignupPage() {
  return (
    <>
      <div className={styles.signupPage}>
        <SigninHero />
      </div>
    </>
  );
}
