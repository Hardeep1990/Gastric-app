const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const { router } = require("./routes/routes");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
const users = require("./routes/users");
const participant = require("./routes/participants");
const authparticipants = require("./routes/authparticipant");
const PORT = 8000;

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost:27017/nihiDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to the database...."))
  .catch((err) => console.error(err.details[0].message));

app.use(cors());
app.use(express.json());

app.use(router);
app.use("/api/users", users);
app.use("/api/participants", participant);
app.use("/api/authparticipants", authparticipants);
app.use("/api/auth", auth);

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
