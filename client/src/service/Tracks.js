import axios from "axios";
export const createTrack = async (data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/tracks`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllSongs = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/tracks`,
      
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllSongsDebounce = async (title, limit) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/tracks?filter=title,${title}&limit=${limit}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateTrack = async (id, data) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL_BACKEND}/tracks/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDetailsTrack = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/tracks/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTrack = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND}/tracks/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

