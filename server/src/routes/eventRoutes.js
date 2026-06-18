const express = require("express");
const {
  createEvent,
  getSessions,
  getSessionEvents,
  getHeatmapData,
  getPages
} = require("../controllers/eventController");

const router = express.Router();

router.post("/", createEvent);
router.get("/sessions", getSessions);
router.get("/sessions/:sessionId/events", getSessionEvents);
router.get("/heatmap", getHeatmapData);
router.get("/pages", getPages);
module.exports = router;