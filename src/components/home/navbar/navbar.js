import React, { useState } from "react";
import logo from "./assets/logo.png";
import gastricAlimentry from "./assets/Gastric Alimetry.png";
import ellipsis from "./assets/ellipsis.png";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
const Navbar = ({ users, participant, day }) => {
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(false);
  const [closing, setClosing] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <div id="firstNav" className="col-sm-8">
          <div id="logoDiv" className="col-sm-6" style={{ textAlign: "left" }}>
            <img src={logo} alt="gastric logo" className={styles.gastricLogo} />
            <img
              src={gastricAlimentry}
              alt="gastric-alimentry"
              className={styles.appName}
            />
          </div>

          <div
            id="displayDay"
            className="col-sm-6"
            style={{
              visibility: participant ? "visible" : "hidden",
              transition: "visibility 0.3s",
            }}
          >
            <h1 className={styles.dayH1}>Day {day}</h1>
          </div>
        </div>
        <div className="col-sm-4" style={{ textAlign: "right" }}>
          <img
            className={styles.ellipsis}
            src={ellipsis}
            alt="ellipsis"
            onClick={() => {
              if (openNav) {
                setClosing(true);
                setTimeout(() => {
                  setClosing(false);
                  setOpenNav(!openNav);
                }, 500);
              } else {
                setOpenNav(!openNav);
              }
            }}
          />
        </div>
      </nav>

      <nav
        className={
          openNav === false
            ? styles.closedNavOutterContainer
            : styles.openedNavOutterContainer
        }
        id={closing ? styles.closingNavOutterContainer : null}
      >
        <div className={styles.openedNavInnerContainer}>
          <ol className={styles.modalOrderedList}>
            <li
              className={styles.modalListOptions}
              onClick={() => {
                navigate("/");
                setClosing(false);
                setOpenNav(false);
              }}
            >
              Symptom Diary
            </li>

            <li
              className={styles.modalListOptions}
              onClick={() => {
                navigate("/signin");
                setClosing(false);
                setOpenNav(false);
              }}
            >
              Sign in
            </li>
            <li
              className={styles.modalListOptions}
              onClick={() => {
                navigate("/contact-us");
                setClosing(false);
                setOpenNav(false);
              }}
            >
              Contact us
            </li>

            {users && (
              <li
                className={styles.modalListOptions}
                onClick={() => {
                  navigate("/logout");
                  setClosing(false);
                  setOpenNav(false);
                }}
              >
                Logout
              </li>
            )}
            {participant && (
              <li
                className={styles.modalListOptions}
                onClick={() => {
                  navigate("/logoutParticipant");
                  setClosing(false);
                  setOpenNav(false);
                }}
              >
                Logout
              </li>
            )}
          </ol>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
