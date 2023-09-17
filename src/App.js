import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import moment from "moment";
import "bootstrap/dist/js/bootstrap.js";
import Navbar from "./components/home/navbar/navbar";
import HomePage from "./pages/homePage/homePage";
import SigninPage from "./pages/signinPage/signinPage";
import AddPaticipantPage from "./pages/addParticipantPage/addPaticipantPage";
import ContactPage from "./pages/contactUsPage/contactPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import DashboardMain from "./pages/Dashboard/Symptoms/DashboardSympt";
import ConfirmRatingPage from "./pages/confirmPage/confirmPage";
import SuccessPage from "./pages/successPage/successPage";
import CompletionPage from "./pages/completionPage/completionPage";
import Logout from "./components/logout";
import LogoutParticipant from "./components/logoutParticipant";
import Reminder from "./components/reminder/reminder";
import AnxietyPage from "./pages/axietyPage/anxietyPage";
import DepressionPage from "./pages/depressionPage/depressionPage";
import styles from "./app.module.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwtAuth = localStorage.getItem("jwtTokenAuth");
      const jwtParticipant = localStorage.getItem("jwtTokenParticipant");

      if (!jwtAuth && !jwtParticipant) {
        this.setState({ user: null, participant: null });
        return;
      }

      let user = null;
      let participant = null;
      let numberOfTests = null;
      let displayDay = null;
      let todaysDate = null;
      if (jwtAuth) {
        user = jwtDecode(jwtAuth);
      }
      if (jwtParticipant) {
        participant = jwtDecode(jwtParticipant);
        participant.token = jwtParticipant;

        todaysDate = moment(new Date(), "YYYY-MM-DD");
        const startDate = moment(participant.startDate, "YYYY-MM-DD");
        const testDate = moment(participant.testDate, "YYYY-MM-DD");
        numberOfTests = testDate.diff(startDate, "days") + 1;

        displayDay = todaysDate.diff(startDate, "days") + 1;
      }

      this.setState({
        user,
        participant,
        numberOfTests,
        displayDay,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { user, participant, numberOfTests, displayDay } = this.state;

    return (
      <div className={styles.app}>
        <Navbar users={user} participant={participant} day={displayDay} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage users={user} />} />
          <Route
            path="/add-participant"
            element={<AddPaticipantPage users={user} />}
          />
          <Route
            path="/reminder"
            element={<Reminder participant={participant} />}
          />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route
            path="/welcome-page/*"
            element={<WelcomePage participant={participant} />}
          />
          <Route
            path="/dashboard/*"
            element={<DashboardMain participant={participant} />}
          />
          <Route
            path="/anxiety"
            element={
              <AnxietyPage
                day={displayDay}
                testDay={numberOfTests}
                participant={participant}
              />
            }
          />
          <Route
            path="/depression"
            element={
              <DepressionPage
                day={displayDay}
                testDay={numberOfTests}
                participant={participant}
              />
            }
          />
          <Route
            path="/confirm/*"
            element={
              <ConfirmRatingPage
                day={displayDay}
                testDay={numberOfTests}
                participant={participant}
              />
            }
          />
          <Route path="/success" element={<SuccessPage day={displayDay} />} />
          <Route
            path="/completion"
            element={<CompletionPage day={displayDay} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/logoutParticipant" element={<LogoutParticipant />} />
        </Routes>
      </div>
    );
  }
}
export default App;
