const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    albumCover: {
      type: String,
      required: true,
    },
    tracks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
  },
  {
    timestamps: true,
  }
);

playlistSchema.index({ title: "text" });
const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
