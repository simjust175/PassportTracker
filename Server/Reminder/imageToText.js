// server.js
import express from 'express';
import multer from 'multer';
import tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = 3444;

// Set up multer for file uploading
const upload = multer({ dest: 'uploads/' });

// Handle file upload and OCR processing
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  // Check if the uploaded file is an image (can add further validation here)
  if (!filePath.match(/\.(jpg|jpeg|png)$/)) {
    return res.status(400).send('Only image files are allowed');
  }

  // Perform OCR using Tesseract.js
  tesseract.recognize(
    filePath,
    'eng', // Language code for English
    {
      logger: (m) => console.log(m), // Optional logging for progress
    }
  )
    .then(({ data: { text } }) => {
      // Send the extracted text as a response
      res.json({ extractedText: text });
    })
    .catch((err) => {
      console.error('OCR Error:', err);
      res.status(500).send('Error processing image');
    })
    .finally(() => {
      // Clean up the uploaded file after processing
      fs.unlinkSync(filePath);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
