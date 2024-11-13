const router = require("express").Router();
const trackController = require("../Controllers/TrackController");
const upload = require("../middleware/upload");

// Get all tracks with filtering, sorting and pagination options
router.get("/", trackController.getAllTracks);

// Create new track with audio file upload
router.post("/", upload.single('audioFile'), trackController.createTrack);

// Get track by ID
router.get("/:id", trackController.getTrackById);

// Update track by ID
router.put("/:id", trackController.updateTrack);

// Delete track by ID 
router.delete("/:id", trackController.deleteTrack);

module.exports = router;
