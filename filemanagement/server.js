const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const fileRoutes = require('./routers/fileroutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Route definitions
app.post('/api/upload', fileRoutes.uploadFile);
app.get('/api/files', fileRoutes.getAllFiles);
app.get('/api/files/:id', fileRoutes.getFileById);
app.delete('/api/files/:id', fileRoutes.deleteFileById);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/filemanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Serve static Angular files
app.use(express.static(path.join(__dirname, "./dist/filemanagement")));

// Start the server
const PORT_NUMBER = 8081;
app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
