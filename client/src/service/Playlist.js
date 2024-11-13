import axios from "axios";

export const getAllPlaylist = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/playlists`
  );
  return res.data;
};

export const createPlaylist = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/playlists`, data)
  return res.data
}

export const deletePlaylist = async (id) => {
  const res = await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND}/playlists/${id}`)
  return res.data
}
export const getPlaylistById = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/playlists/${id}`)
  return res.data
}
export const updatePlaylist = async (id, data) => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL_BACKEND}/playlists/${id}`, data)
  return res.data
}
