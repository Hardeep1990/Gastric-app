import Contact from "../../components/contactUs/contact";
import styles from "./contactPage.module.css";

export default function ContactPage() {
  return (
    <>
      <div className={styles.contactPage}>
        <Contact />
      </div>
    </>
  );
}
