const express = require("express");
const router = express.Router();
const fileController = require("../routers/fileController");

// Route to upload a file
router.post("/upload-file", fileController.uploadFile);

// Route to get all files
router.get("/files", fileController.getAllFiles);

// Route to get a specific file by ID
router.get("/files/:id", fileController.getFileById);

// Route to delete a specific file by ID
router.delete("/files/:id", fileController.deleteFileById);

module.exports = router;
