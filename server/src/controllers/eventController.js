const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const {
      sessionId,
      eventType,
      pageUrl,
      timestamp,
      clickData,
      userAgent
    } = req.body;

    if (!sessionId || !eventType || !pageUrl || !timestamp) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const event = await Event.create({
      sessionId,
      eventType,
      pageUrl,
      timestamp,
      clickData,
      userAgent
    });

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create event"
    });
  }
};


const getSessions = async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$sessionId",
          totalEvents: { $sum: 1 },
          firstEvent: { $min: "$timestamp" },
          lastEvent: { $max: "$timestamp" }
        }
      },
      {
        $project: {
          _id: 0,
          sessionId: "$_id",
          totalEvents: 1,
          firstEvent: 1,
          lastEvent: 1
        }
      },
      {
        $sort: {
          lastEvent: -1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions"
    });
  }
};
const getSessionEvents = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const events = await Event.find({ sessionId })
      .sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch session events"
    });
  }
};
const getHeatmapData = async (req, res) => {
  try {
    const { pageUrl } = req.query;

    if (!pageUrl) {
      return res.status(400).json({
        success: false,
        message: "pageUrl query parameter is required"
      });
    }

    const clicks = await Event.find({
      pageUrl,
      eventType: "click"
    }).select("clickData -_id");

    const heatmapData = clicks.map((event) => ({
      x: event.clickData?.x,
      y: event.clickData?.y
    }));

    res.status(200).json({
      success: true,
      data: heatmapData
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch heatmap data"
    });
  }
};
const getPages = async (req, res) => {
  try {
    const pages = await Event.distinct("pageUrl");
pages.sort();
    res.status(200).json({
      success: true,
      data: pages
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pages"
    });
  }
};
module.exports = {
  createEvent,
  getSessions,
  getSessionEvents,
  getHeatmapData,
  getPages
};