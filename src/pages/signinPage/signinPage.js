import SigninHero from "../../components/signin/signinHero";
import styles from "./signinPage.module.css";

export default function SigninPage({ users }) {
  console.log("users in signinPage", users);
  return (
    <>
      <div className={styles.signupPage}>
        <SigninHero users={users} />
      </div>
    </>
  );
}
