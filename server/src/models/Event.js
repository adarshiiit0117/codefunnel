const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },

    eventType: {
      type: String,
      enum: ["page_view", "click"],
      required: true,
      index: true
    },

    pageUrl: {
      type: String,
      required: true,
      index: true
    },

    timestamp: {
      type: Date,
      required: true,
      index: true
    },

    clickData: {
      x: Number,
      y: Number
    },

    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);