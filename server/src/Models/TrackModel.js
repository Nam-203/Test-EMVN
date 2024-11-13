const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 1900 && value <= new Date().getFullYear();
      },
      message: props => `${props.value} is not a valid release year!`
    }
  },
  image :{
    type: String,
  },
  duration: {
    type: Number,  
    required: true,
    min: [1, 'Thời lượng phải là số dương']
  },
  audioFile: {
    type: String,  
    required: true
  }
}, {
  timestamps: true
});

trackSchema.index({
  title: 'text',
  artist: 'text',
  album: 'text',
  genre: 'text'
});
const Track = mongoose.model("Track", trackSchema);
module.exports = Track;
