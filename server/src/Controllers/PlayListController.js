const PlaylistService = require("../Service/PlayListService");

// Controller to get all playlists
const getAllPlaylists = async (req, res, next) => {
  try {
    const response = await PlaylistService.getAllPlaylists();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Controller to create a new playlist
const createPlaylist = async (req, res, next) => {
  try {
    const { title, albumCover, tracks } = req.body;
    if (!title || !tracks || !albumCover) {
      return res.status(404).json({
        message: "title, or tracksId not found",
      });
    }
    const response = await PlaylistService.createListPlay(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Controller to get a playlist by its ID
const getPlaylistById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "id not found",
      });
    }
    const response = await PlaylistService.getPlaylistById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Controller to update an existing playlist
const updatePlaylist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(404).json({
        message: "id or data not found",
      });
    }
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }
    const response = await PlaylistService.updatePlaylist(id, data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Controller to delete a playlist
const deletePlaylist = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "id not found",
      });
    }
    const response = await PlaylistService.deletePlaylist(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  getAllPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};
