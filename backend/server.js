const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/database");
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const patientRoutes = require("./routes/patientRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const casepaperRoutes = require("./routes/casepaperRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes")

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/casepapers", casepaperRoutes);
app.use("/api/appointment", appointmentRoutes);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
