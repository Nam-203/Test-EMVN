const router = require("express").Router();
const playlistController = require("../Controllers/PlaylistController");
router.get("/", playlistController.getAllPlaylists);
router.post("/", playlistController.createPlaylist);
router.get("/:id", playlistController.getPlaylistById);
router.put("/:id", playlistController.updatePlaylist);
router.delete("/:id", playlistController.deletePlaylist);

module.exports = router;
