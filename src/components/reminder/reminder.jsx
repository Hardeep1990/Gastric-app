import { useState } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Select,
  Button,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { addReminder } from "../services/authService";
import "./reminder.css";

export default function Reminder({ participant }) {
  const parti = { ...participant };
  const name = parti.firstName + " " + parti.lastName;

  const [hour, setHour] = useState("8");
  const [minutes, setMinutes] = useState("15");
  const [meridian, setMeridian] = useState("PM");

  async function handleOk() {
    const reminderAt = hour + ":" + minutes + " " + meridian;
    const participantId = participant.participantId;
    try {
      await addReminder(participantId, reminderAt);
      window.location = "/welcome-page/*";
    } catch (error) {
      console.log("reminder is not added.", error);
    }
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 2,
        marginBottom: 2,
        paddingLeft: 2,
        paddingRight: 2,
        display: "flex",
        flexDirection: "row",
        justifyContents: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          textAlign: "center",
          marginTop: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Hi {name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" spacing={2}>
              Over the next week we want you to record any <br />
              symptoms you had each day.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" spacing={2}>
              {" "}
              Select the best time for us to send you
              <br /> a reminder to record your symptoms.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                className="timeTextField"
                id="outlined-number"
                label="Hour"
                type="number"
                inputProps={{ min: "1", max: "12" }}
                value={hour}
                onChange={(e) => {
                  setHour(e.target.value);
                }}
              />
              :
              <TextField
                className="timeTextField"
                id="outlined-number"
                label="Minutes"
                type="number"
                inputProps={{ min: "0", max: "59" }}
                value={minutes}
                onChange={(e) => {
                  setMinutes(e.target.value);
                }}
              />
              <Select
                className="timeTextField"
                id="outlined-meridian"
                value={meridian}
                onChange={(e) => {
                  setMeridian(e.target.value);
                }}
              >
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleOk}>
              Set Reminder
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
