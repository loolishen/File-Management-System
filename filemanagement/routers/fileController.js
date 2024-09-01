const mongoose = require('mongoose');
const multer = require('multer');
const File = require('../model/file');
const fs = require('fs');
const path = require('path');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = {
  uploadFile: function (req, res) {
    upload.any()(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
      }

      const fileSaves = req.files.map(file => {
        const newFile = new File({
          filename: file.filename,
          filepath: file.path,
          size: file.size,
        });
        return newFile.save();
      });

      try {
        let savedFiles = await Promise.all(fileSaves);
        res.json(savedFiles);
      } catch (saveError) {
        res.status(500).json({ error: saveError.message });
      }
    });
  },

  getAllFiles: async function (req, res) {
    try {
      let files = await File.find({}).exec();
      res.json(files);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getFileById: async function (req, res) {
    let fileId = req.params.id;

    try {
      let file = await File.findById(fileId).exec();
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      res.json(file);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteFileById: async function (req, res) {
    let fileId = req.params.id;

    try {
      let file = await File.findByIdAndDelete(fileId).exec();
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = path.join(__dirname, '..', file.filepath);

      fs.unlink(filePath, err => {
        if (err) {
          console.error('Error deleting the file:', err);
          return res.status(500).json({ error: 'File deletion failed' });
        }
        res.json({ message: 'File deleted successfully' });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
