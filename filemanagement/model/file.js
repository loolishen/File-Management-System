const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  size: { type: Number, required: true },
});

module.exports = mongoose.model('File', fileSchema);
