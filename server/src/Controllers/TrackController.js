// Import required models and services
const Track = require("../Models/TrackModel");
const fs = require("fs").promises;
const TracksService = require("../Service/TracksService");

/**
 * Get all tracks with filtering, sorting and pagination
 * @param {Object} req - Express request object containing query parameters
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with tracks data or error
 */
const getAllTracks = async (req, res, next) => {
  try {
    const page = Math.max(0, parseInt(req.query.page) || 0);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const { sort, filter } = req.query;

    // Parse sort parameter if provided
    let sortArray;
    if (sort) {
      sortArray = sort.split(",");
    }

    // Parse and validate filter parameter if provided
    let filterArray;
    if (filter) {
      filterArray = filter.split(",");
      if (filterArray.length !== 2) {
        return res.status(400).json({
          success: false,
          message: "Filter format should be 'field,value'",
        });
      }
    }

    const response = await TracksService.getAllTracks(
      limit,
      page,
      sortArray,
      filterArray
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching tracks",
      error: error.message,
    });
  }
};

/**
 * Create a new track with uploaded audio file
 * @param {Object} req - Express request object containing track data and file
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with created track or error
 */
const createTrack = async (req, res, next) => {
  try {
    const { title, artist, album, genre, releaseYear, duration ,image } = req.body;

    // Validate required fields
    if (!title || !artist || !genre || !releaseYear || !duration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if audio file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }
    const track = await TracksService.createTrack(req.body, req.file);
    return res.status(200).json(
      track,
    );
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }

    res.status(500).json({
      success: false,
      message: "Error creating track",
      error: error.message,
    });
  }
};

/**
 * Get a track by its ID
 * @param {Object} req - Express request object containing track ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with track data or error
 */
const getTrackById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "id not found",
      });
    }
    const response = await TracksService.getTrackById(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching track",
      error: error.message,
    });
  }
};

/**
 * Update a track by its ID
 * @param {Object} req - Express request object containing track ID and update data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with updated track or error
 */
const updateTrack = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Check if track exists
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }
    const response = await Track.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating track",
      error: error.message,
    });
  }
};

/**
 * Delete a track by its ID
 * @param {Object} req - Express request object containing track ID
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with deletion confirmation or error
 */
const deleteTrack = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    const response = await TracksService.deleteTrack(id);
    res.status(200).json({
      success: true,
      message: "Track deleted successfully",
      response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting track",
      error: error.message,
    });
  }
};

// Export controller functions
module.exports = {
  getAllTracks,
  createTrack,
  getTrackById,
  updateTrack,
  deleteTrack,
};
