const Playlist = require("../Models/PlayListModel");
const Track = require("../Models/TrackModel");
const createListPlay =async (dataList)=>{
  return new Promise(async(resolve,reject) =>{
    try {
      const {title ,albumCover,tracks} = dataList;
      if (!title ||!albumCover ||!tracks) {
        reject({
          status: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }
      const checkId = await Track.findById(tracks);
      if (!checkId) {
        resolve({
          status: "NOT_FOUND",
          message: "Track not found",
        });
      }
      const newPlaylist = await Playlist.create({
        title,
        albumCover,
        tracks
      });
      resolve({
        status: "CREATED",
        message: "Playlist created successfully",
        data: newPlaylist,
      });
  
    } catch (error) {
      reject(error);
    }
   
    
  })
}
const getAllPlaylists = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const playlists = await Playlist.find();
      resolve({
        status: "OK",
        message: "Success",
        data: playlists,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getPlaylistById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const playlist = await Playlist.findById(id);
      if (!playlist) {
        reject({
          status: "NOT_FOUND",
          message: "Playlist not found",
        });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: playlist,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updatePlaylist = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listId = await Playlist.findById(id);
      if (!listId) {
        reject({
          status: "NOT_FOUND",
          message: "Playlist not found",
        });
      }
      const playlist = await Playlist.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (playlist) {
        resolve({
          status: "OK",
          message: "Success",
          data: playlist,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deletePlaylist = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const playlist = await Playlist.findById(id);
      if (!playlist) {
        resolve({
          status: "NOT_FOUND",
          message: "Playlist not found",
        });
      }
      await Playlist.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Success",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllPlaylists,
  getPlaylistById,
  createListPlay,
  updatePlaylist,
  deletePlaylist,
};
