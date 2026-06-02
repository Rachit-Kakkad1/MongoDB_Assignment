const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    data: null,
  });
});

module.exports = app;
