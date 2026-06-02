const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes Management API A2 is running");
});

app.use("/api/notes", noteRoutes);

module.exports = app;
