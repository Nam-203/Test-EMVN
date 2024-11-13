/**
 * Track service module for handling track-related operations
 * @module TracksService
 */
const Track = require("../Models/TrackModel");
const path = require("path");

/**
 * Get all tracks with pagination, sorting and filtering
 * @param {number} limit - Number of tracks per page
 * @param {number} page - Page number
 * @param {Array} sort - Sort parameters [order, field]
 * @param {Array} filter - Filter parameters [field, value]
 * @returns {Promise} Resolves with tracks data
 */
const getAllTracks = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Count the total number of tracks in the database

      const totalTracks = await Track.countDocuments();
      let allTracks = [];
      const validPage = Math.max(0, page);
      const validLimit = Math.max(1, limit);
      const skip = validPage * validLimit;
      // Fields to be selected from the database

      const selectFields = {
        title: 1,
        artist: 1,
        album: 1,
        genre: 1,
        releaseYear: 1,
        duration: 1,
        audioFile: 1,
        createdAt: 1,
        updatedAt: 1,
      };

      if (filter && Array.isArray(filter) && filter.length === 2) {
        const [field, value] = filter;
        const query = {
          [field]: { $regex: value, $options: "i" },
        };
        const filteredTracks = await Track.find(query)
          .select(selectFields)
          .limit(validLimit)
          .skip(skip)
          .sort({ createdAt: -1, updatedAt: -1 });
        // Count the number of tracks that match the filter

        const filteredCount = await Track.countDocuments(query);
        // Map the filtered tracks to include the audio file URL
        const tracksWithAudioUrls = filteredTracks.map((track) => ({
          ...track.toObject(),
          audioFile: `${track.audioFile}`,
        }));
        // Return the filtered tracks with audio file URLs
        return resolve({
          status: "OK",
          message: "Success",
          data: tracksWithAudioUrls,
          total: filteredCount,
          pageCurrent: validPage + 1,
          totalPage: Math.ceil(filteredCount / validLimit),
        });
      }
      // Sort the tracks based on the provided parameters
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allTracksSort = await Track.find()
          .select(selectFields)
          .limit(validLimit)
          .skip(skip)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        // Map the sorted tracks to include the audio file URL
        const tracksWithAudioUrls = allTracksSort.map((track) => ({
          ...track.toObject(),
          audioFile: `${track.audioFile}`,
        }));
        // Return the sorted tracks with audio file URLs
        return resolve({
          status: "OK",
          message: "Success",
          data: tracksWithAudioUrls,
          total: totalTracks,
          pageCurrent: validPage + 1,
          totalPage: Math.ceil(totalTracks / validLimit),
        });
      }
      // Get all tracks without sorting or filtering
      allTracks = await Track.find()
        .select(selectFields)
        .limit(validLimit)
        .skip(skip)
        .sort({ createdAt: -1, updatedAt: -1 });

      const tracksWithAudioUrls = allTracks.map((track) => ({
        ...track.toObject(),
        audioFile: `${track.audioFile}`,
        }));
      // Return the tracks with audio file URLs
      resolve({
        status: "OK",
        message: "Success",
        data: tracksWithAudioUrls,
        total: totalTracks,
        pageCurrent: validPage + 1,
        totalPage: Math.ceil(totalTracks / validLimit),
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Create a new track
 * @param {Object} data - Track data
 * @param {Object} file - Uploaded audio file
 * @returns {Promise} Resolves with created track
 */
const createTrack = async (data, file) => {
  return new Promise(async (resolve, reject) => {
    const { title, artist, album, genre, releaseYear, duration } = data;
    try {
      // Create a new track with the provided data
      const track = new Track({
        title,
        artist,
        album,
        genre,
        releaseYear,
        duration,
        audioFile: `${
          process.env.API_URL || "http://localhost:3001"
        }/${file.path.replace(/\\/g, "/")}`,
      });
      const res = await track.save();
      // Save the new track to the database
      if (res) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get a track by ID
 * @param {string} id - Track ID
 * @returns {Promise} Resolves with track data
 */
const getTrackById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        reject({
          status: "BAD_REQUEST",
          message: "id not found",
        });
      }
      const res = await Track.findById(id);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Update a track
 * @param {string} id - Track ID
 * @param {Object} data - Updated track data
 * @returns {Promise} Resolves with updated track
 */
const updateTrack = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        reject({
          status: "BAD_REQUEST",
          message: "id not found",
        });
      }
      if (!data) {
        reject({
          status: "BAD_REQUEST",
          message: "data not found",
        });
      }
      const res = await Track.findByIdAndUpdate(id, data, { new: true });
      if (res) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Delete a track
 * @param {string} id - Track ID
 * @returns {Promise} Resolves with deleted track
 */
const deleteTrack = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findId = await Track.findById(id);
      if (!findId) {
        reject({
          status: "BAD_REQUEST",
          message: "id not found",
        });
      }
      const res = await Track.findByIdAndDelete(id);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllTracks,
  createTrack,
  getTrackById,
  updateTrack,
  deleteTrack,
};
