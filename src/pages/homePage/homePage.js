import { useState } from "react";
import HomePageHero from "../../components/home/hero/homeLoginHero";
import styles from "./homePage.module.css";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={styles.homePage}>
        <HomePageHero openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </>
  );
}
