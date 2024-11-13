const trackRoutes = require("./trackRouter");
const playlistRoutes = require("./playlistRoutes");

const routes = (app) => {
  app.use("/api/tracks", trackRoutes);
  app.use("/api/playlists", playlistRoutes);
}

module.exports = routes;
