const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codefunnel-m53f.vercel.app/"
    ]
  })
);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
});

app.use("/api/events", eventRoutes);

module.exports = app;
